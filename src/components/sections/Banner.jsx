import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Banner = ({ events = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    if (events.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % events.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [events.length]);

  if (events.length === 0) return null;

  return (
    <section className="banner">
      {events.map((event, index) => (
        <div 
          key={event.id}
          className={`banner-slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${event.image || '/placeholder.jpg'})` }}
        >
          <div className="banner-content">
            <h2 className="banner-title">{event.title}</h2>
            <p className="banner-text">{event.description?.substring(0, 100) || 'Описание мероприятия'}...</p>
            <Link to={`/events/${event.id}`} className="banner-btn">
              Узнать подробности
            </Link>
          </div>
        </div>
      ))}
      
      <div className="banner-nav">
        {events.map((_, index) => (
          <div 
            key={index}
            className={`banner-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
      
      <button 
        className="banner-arrow prev-arrow"
        onClick={() => setCurrentSlide(prev => (prev - 1 + events.length) % events.length)}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      
      <button 
        className="banner-arrow next-arrow"
        onClick={() => setCurrentSlide(prev => (prev + 1) % events.length)}
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </section>
  );
};

export default Banner;