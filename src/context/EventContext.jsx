// src/context/EventContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { fetchEvents, createEvent, updateEvent, completeEvent, sendNotification } from '../api/events';

const EventContext = createContext();

export const useEvents = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState({ future: [], past: [] });
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchEvents();
      setEvents({
        future: data.filter(e => new Date(e.date) > new Date()),
        past: data.filter(e => new Date(e.date) <= new Date())
      });
      setNotifications(data.flatMap(e => e.notifications || []));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (eventData) => {
    const newEvent = await createEvent(eventData);
    setEvents(prev => ({
      ...prev,
      future: [...prev.future, newEvent]
    }));
    
    // Добавляем уведомление о создании
    addNotification({
      type: 'new',
      message: `Создано новое мероприятие: ${newEvent.title}`,
      eventId: newEvent.id,
      timestamp: new Date().toISOString()
    });
    
    return newEvent;
  };

  const editEvent = async (id, updates) => {
    const updatedEvent = await updateEvent(id, updates);
    setEvents(prev => ({
      future: prev.future.map(e => e.id === id ? updatedEvent : e),
      past: prev.past.map(e => e.id === id ? updatedEvent : e)
    }));
    
    // Уведомление об изменении
    addNotification({
      type: 'change',
      message: `Изменено мероприятие: ${updatedEvent.title}`,
      eventId: id,
      timestamp: new Date().toISOString()
    });
    
    return updatedEvent;
  };

  const finishEvent = async (id, reportData) => {
    const completedEvent = await completeEvent(id, reportData);
    setEvents(prev => ({
      future: prev.future.filter(e => e.id !== id),
      past: [completedEvent, ...prev.past]
    }));
    
    // Уведомление о завершении
    addNotification({
      type: 'complete',
      message: `Завершено мероприятие: ${completedEvent.title}`,
      eventId: id,
      timestamp: new Date().toISOString()
    });
    
    return completedEvent;
  };

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const sendEventNotification = async (eventId, content, recipients) => {
    await sendNotification(eventId, { content, recipients });
    addNotification({
      type: 'custom',
      message: `Отправлено уведомление для мероприятия`,
      eventId,
      timestamp: new Date().toISOString()
    });
  };

  const value = {
    events,
    notifications,
    loading,
    error,
    addEvent,
    editEvent,
    finishEvent,
    sendEventNotification,
    addNotification
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};