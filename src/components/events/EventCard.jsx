import { useAppContext } from '../../context/AppContext';

const EventCard = ({ event, showActions = false, onEdit, onComplete, onClick }) => {
  const { user } = useAppContext();
  const isPast = event.isPast;
  const hasImages = event.images && event.images.length > 0;

  return (
    <div className="event-card">
      {hasImages && (
        <div 
          className="event-card-image" 
          style={{ backgroundImage: `url(${event.images[0]})` }}
        />
      )}
      
      <div className="event-card-content">
        <h3 className="event-card-title">{event.title}</h3>
        
        <div className="event-card-meta">
          <span><i className="fas fa-calendar"></i> {event.date}</span>
          <span><i className="fas fa-clock"></i> {event.time}</span>
          <span><i className="fas fa-map-marker-alt"></i> {event.location}</span>
        </div>
        
        <span className={`event-card-status ${isPast ? 'status-past' : 'status-upcoming'}`}>
          {isPast ? 'Завершено' : 'Запланировано'}
        </span>
        
        {showActions && !isPast && user?.role === 'teacher' && (
          <div className="event-card-actions">
            <button 
              className="edit-btn" 
              onClick={(e) => {
                e.stopPropagation();
                onEdit && onEdit(event);
              }}
            >
              Редактировать
            </button>
            <button 
              className="edit-btn" 
              onClick={(e) => {
                e.stopPropagation();
                onComplete && onComplete(event);
              }}
              style={{ marginLeft: '8px' }}
            >
              Завершить
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;