import { useAppContext } from '../../context/AppContext';
import EventCard from './EventCard';

const NewsFeed = () => {
  const { events } = useAppContext();
  
  // Фильтруем прошедшие мероприятия с отчетом
  const newsEvents = events.filter(event => 
    event.isPast && event.report
  );

  return (
    <section className="news-section">
      <h2 className="section-title">
        <i className="fas fa-newspaper"></i> Новостная лента
      </h2>
      
      {newsEvents.length === 0 ? (
        <p className="no-events">Нет новостей</p>
      ) : (
        <div className="news-grid">
          {newsEvents.map(event => (
            <div 
              key={event.id} 
              className="news-card"
            >
              {event.images.length > 0 && (
                <div 
                  className="news-image" 
                  style={{ backgroundImage: `url(${event.images[0]})` }}
                ></div>
              )}
              <div className="news-content">
                <h3 className="news-title">{event.title}</h3>
                <div className="news-meta">
                  <span><i className="fas fa-user"></i> {event.responsible}</span>
                  <span><i className="fas fa-calendar"></i> {event.date}</span>
                </div>
                <p className="news-excerpt">
                  {event.report.comment.slice(0, 100)}...
                </p>
                <a className="news-link">
                  Читать подробнее <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default NewsFeed;