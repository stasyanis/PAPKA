// src/store/eventStore.js
import { create } from 'zustand';
import { 
  fetchEvents, 
  fetchEventById, 
  createEvent, 
  updateEvent,
  deleteEvent,
  registerForEvent
} from '../api/events';

const useEventStore = create((set, get) => ({
  events: [],
  futureEvents: [],
  pastEvents: [],
  loading: false,
  error: null,
  currentEvent: null,
  
  fetchEvents: async () => {
    set({ loading: true });
    try {
      const events = await fetchEvents();
      const now = new Date();
      
      const future = events.filter(e => new Date(e.date) > now);
      const past = events.filter(e => new Date(e.date) <= now);
      
      set({ events, futureEvents: future, pastEvents: past, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  fetchEvent: async (id) => {
    set({ loading: true });
    try {
      const event = await fetchEventById(id);
      set({ currentEvent: event, loading: false });
      return event;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  addEvent: async (eventData) => {
    set({ loading: true });
    try {
      const newEvent = await createEvent(eventData);
      set(state => {
        const events = [...state.events, newEvent];
        const now = new Date();
        
        const future = events.filter(e => new Date(e.date) > now);
        return { 
          events,
          futureEvents: future,
          loading: false
        };
      });
      return newEvent;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  updateEvent: async (id, updates) => {
    set({ loading: true });
    try {
      const updatedEvent = await updateEvent(id, updates);
      set(state => {
        const events = state.events.map(e => e.id === id ? updatedEvent : e);
        const now = new Date();
        
        const future = events.filter(e => new Date(e.date) > now);
        const past = events.filter(e => new Date(e.date) <= now);
        
        return {
          events,
          futureEvents: future,
          pastEvents: past,
          currentEvent: state.currentEvent?.id === id ? updatedEvent : state.currentEvent,
          loading: false
        };
      });
      return updatedEvent;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  participate: async (eventId) => {
    set({ loading: true });
    try {
      const updatedEvent = await registerForEvent(eventId);
      set(state => {
        const events = state.events.map(e => e.id === eventId ? updatedEvent : e);
        const now = new Date();
        
        const future = events.filter(e => new Date(e.date) > now);
        const past = events.filter(e => new Date(e.date) <= now);
        
        return {
          events,
          futureEvents: future,
          pastEvents: past,
          currentEvent: state.currentEvent?.id === eventId ? updatedEvent : state.currentEvent,
          loading: false
        };
      });
      return updatedEvent;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  removeEvent: async (id) => {
    set({ loading: true });
    try {
      await deleteEvent(id);
      set(state => {
        const events = state.events.filter(e => e.id !== id);
        const now = new Date();
        
        const future = events.filter(e => new Date(e.date) > now);
        const past = events.filter(e => new Date(e.date) <= now);
        
        return {
          events,
          futureEvents: future,
          pastEvents: past,
          currentEvent: state.currentEvent?.id === id ? null : state.currentEvent,
          loading: false
        };
      });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  }
}));

export default useEventStore;