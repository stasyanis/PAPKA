  // src/components/events/Calendar.jsx
  import { useState, useEffect } from 'react';
  import { 
    startOfMonth, 
    endOfMonth, 
    eachDayOfInterval, 
    isSameMonth, 
    isSameDay,
    format,
    addMonths,
    subMonths
  } from 'date-fns';
  import { ru } from 'date-fns/locale';

  const Calendar = ({ events, onDayClick }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [days, setDays] = useState([]);

    useEffect(() => {
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(currentMonth);
      
      const daysInMonth = eachDayOfInterval({
        start: monthStart,
        end: monthEnd
      });

      // Добавляем пустые дни для заполнения сетки
      const firstDayOfWeek = monthStart.getDay();
      const emptyDays = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
      
      setDays([
        ...Array(emptyDays).fill(null),
        ...daysInMonth
      ]);
    }, [currentMonth]);

    const prevMonth = () => {
      setCurrentMonth(subMonths(currentMonth, 1));
    };

    const nextMonth = () => {
      setCurrentMonth(addMonths(currentMonth, 1));
    };

    const getEventsForDay = (day) => {
      if (!day) return [];
      return events.filter(event => 
        isSameDay(new Date(event.date), day)
      );
    };

    const getCategoryColor = (category) => {
      const colors = {
        'Концерт': 'var(--concert)',
        'Внутривузовская активность': 'var(--activity)',
        'Общественное мероприятие': 'var(--public)',
        'Соревнование': 'var(--competition)',
        'Лекция': 'var(--accent)',
        'Мастер-класс': 'var(--warning)'
      };
      return colors[category] || 'var(--accent)';
    };

    return (
      <div className="calendar-section">
        <div className="calendar-header">
          <div className="calendar-title">
            <i className="fas fa-calendar-alt"></i>
            <h2>{format(currentMonth, 'LLLL yyyy', { locale: ru })}</h2>
          </div>
          <div className="calendar-nav">
            <button className="calendar-nav-btn" onClick={prevMonth}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="calendar-nav-btn" onClick={nextMonth}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        
        <div className="calendar-grid">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
            <div key={day} className="calendar-day">{day}</div>
          ))}
          
          {days.map((day, index) => {
            const dayEvents = getEventsForDay(day);
            
            return (
              <div 
                key={day ? day.toString() : `empty-${index}`}
                className={`calendar-cell ${dayEvents.length > 0 ? 'has-event' : ''} ${day ? '' : 'empty'}`}
                onClick={() => day && onDayClick(day)}
              >
                {day && (
                  <>
                    <div className="calendar-date">{format(day, 'd')}</div>
                    {dayEvents.slice(0, 2).map(event => (
                      <div 
                        key={event.id} 
                        className="calendar-event"
                        style={{ backgroundColor: getCategoryColor(event.category) }}
                      >
                        {event.category}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="calendar-event">+{dayEvents.length - 2} еще</div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  export default Calendar;