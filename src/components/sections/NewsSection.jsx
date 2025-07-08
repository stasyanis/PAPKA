import EventCard from '../events/EventCard';

const NewsSection = ({ events = [] }) => {
  if (events.length === 0) return null;

  return (
    <section className="news-section">
      <h2 className="section-title">
        <i className="fas fa-newspaper"></i> Новостная лента
      </h2>
      
      <div className="news-grid">
        {events.map(event => (
          <div key={event.id} className="news-card">
            {event.images && event.images.length > 0 && (
              <div 
                className="news-image" 
                style={{ backgroundImage: `url(${event.images[0]})` }}
              ></div>
            )}
            <div className="news-content">
              <h3 className="news-title">{event.title}</h3>
              <div className="news-meta">
                <span><i className="fas fa-user"></i> {event.responsible || "Организатор"}</span>
                <span><i className="fas fa-calendar"></i> {event.date}</span>
              </div>
              <p className="news-excerpt">
                {event.report?.comment?.slice(0, 100) || 'Отчет о мероприятии...'}
              </p>
              <a className="news-link">
                Читать подробнее <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;