import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import EventCard from '../components/events/EventCard';
import CompleteEventModal from '../components/events/CompleteEventModal';

const MyEventsPage = () => {
  const { events } = useAppContext();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);

  // Фильтруем мероприятия по статусу
  const upcomingEvents = events.filter(event => !event.isPast);
  const pastEvents = events.filter(event => event.isPast);

  const handleCompleteEvent = (event) => {
    setSelectedEvent(event);
    setCompleteModalOpen(true);
  };

  const handleCompleteSubmit = (reportData) => {
    // В реальном приложении здесь будет вызов API
    console.log('Отчет о мероприятии:', reportData);
    setCompleteModalOpen(false);
  };

  return (
    <section className="my-events-section">
      <h2 className="section-title">
        <i className="fas fa-calendar-check"></i> Мои мероприятия
      </h2>
      
      <div className="events-tabs">
        <div 
          className={`events-tab ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Будущие события
        </div>
        <div 
          className={`events-tab ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Прошедшие события
        </div>
      </div>
      
      <div className={`events-tab-content ${activeTab === 'upcoming' ? 'active' : ''}`}>
        <div className="events-grid">
          {upcomingEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              showActions={true}
              onEdit={() => console.log('Редактирование', event.id)}
              onComplete={() => handleCompleteEvent(event)}
            />
          ))}
        </div>
      </div>
      
      <div className={`events-tab-content ${activeTab === 'past' ? 'active' : ''}`}>
        <div className="carousel-container">
          {pastEvents.map(event => (
            <div className="carousel-item" key={event.id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
      
      {selectedEvent && (
        <CompleteEventModal 
          isOpen={completeModalOpen}
          onClose={() => setCompleteModalOpen(false)}
          onSubmit={handleCompleteSubmit}
          event={selectedEvent}
        />
      )}
    </section>
  );
};

export default MyEventsPage;