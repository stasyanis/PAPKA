/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';
// Экспортируем контекст отдельно
export const AppContext = createContext();

// Создаем кастомный хук для использования контекста
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user] = useState({
    id: 1,
    name: "Иван Петров",
    role: "teacher",
    group: "ИС-21",
    department: "Кафедра информационных технологий"
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Новое мероприятие: День открытых дверей',
      type: 'event',
      read: false,
      date: '2025-07-05T10:30:00'
    }
  ]);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "День открытых дверей БГИТУ",
      category: "Общественное мероприятие",
      date: "2025-07-15",
      time: "10:00 - 14:00",
      location: "Главный корпус, ауд. 301",
      description: "Приглашаем абитуриентов и их родителей на ежегодный День открытых дверей...",
      maxParticipants: 150,
      currentParticipants: 98,
      isPast: false,
      images: [],
      report: null
    },
    {
      id: 101,
      title: "Уборка Центрального парка",
      category: "Волонтерская активность",
      date: "2025-07-10",
      time: "09:00 - 13:00",
      location: "Центральный парк, Брянск",
      description: "Волонтеры БГИТУ провели масштабную уборку Центрального парка.",
      isPast: true,
      images: [
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      ],
      report: {
        comment: "За 4 часа было собрано более 50 мешков мусора...",
        tasks: ["Сбор мусора", "Покраска скамеек"]
      }
    }
  ]);

  const logout = useCallback(() => {
    localStorage.removeItem('afisha_user');
    console.log("User logged out");
  }, []);

  // Добавляем функцию создания мероприятий
  const createEvent = useCallback((eventData) => {
    const newEvent = {
      ...eventData,
      id: Math.max(...events.map(e => e.id), 0) + 1,
      currentParticipants: 0,
      isPast: false,
      images: [],
      report: null
    };
    setEvents(prev => [...prev, newEvent]);
    return newEvent;
  }, [events]);

  // Добавляем функцию пометки уведомлений прочитанными
  const markNotificationAsRead = useCallback((id) => {
    setNotifications(prev =>
        prev.map(n => n.id === id ? {...n, read: true} : n)
    );
  }, []);

  const value = {
    user,
    notifications,
    events,
    logout,
    createEvent,
    markNotificationAsRead
  };

  return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
  );
};