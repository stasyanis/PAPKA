// src/hooks/useEvents.js
import { useEffect } from 'react';
import useEventStore from '../store/eventStore';

const useEvents = () => {
  const {
    events,
    futureEvents,
    pastEvents,
    loading,
    error,
    currentEvent,
    fetchEvents,
    fetchEvent,
    addEvent,
    updateEvent,
    participate,
    removeEvent
  } = useEventStore();

  useEffect(() => {
    if (events.length === 0) {
      fetchEvents();
    }
  }, [fetchEvents, events.length]);

  return {
    events,
    futureEvents,
    pastEvents,
    currentEvent,
    loading,
    error,
    fetchEvents,
    fetchEvent,
    addEvent,
    updateEvent,
    participate,
    removeEvent
  };
};

export default useEvents;