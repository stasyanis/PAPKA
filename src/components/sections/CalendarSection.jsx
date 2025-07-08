// src/components/sections/CalendarSection.jsx
import { useState } from 'react';
import Calendar from '../events/Calendar';
import Button from '../ui/Button';
import EventModal from '../events/EventModal';

const CalendarSection = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);

  const handleDayClick = (day) => {
  const dayEvents = events.filter(event => 
    new Date(event.date).toDateString() === day.toDateString()
  );
  
  if (dayEvents.length > 0) {
    setSelectedEvent(dayEvents[0]);
    setEventModalOpen(true);
  }
};

  const handleNavigateEvents = (direction) => {
    const dayEvents = events.filter(event => 
      new Date(event.date).toDateString() === selectedDate.toDateString()
    );
    
    if (dayEvents.length > 1) {
      const currentIndex = dayEvents.findIndex(e => e.id === selectedEvent.id);
      const nextIndex = (currentIndex + direction + dayEvents.length) % dayEvents.length;
      setSelectedEvent(dayEvents[nextIndex]);
    }
  };

  return (
    <section className="calendar-section">
      <Calendar events={events} onDayClick={handleDayClick} />
      
      <Button 
        className="view-all-btn" 
        onClick={() => setShowAllEvents(true)}
      >
        Все события на этот месяц
      </Button>
      
      <EventModal
      event={selectedEvent}
      isOpen={selectedEvent !== null && eventModalOpen}
      onClose={() => {
        setEventModalOpen(false);
        setSelectedEvent(null);
      }}
    />
    </section>
  );
};

export default CalendarSection;