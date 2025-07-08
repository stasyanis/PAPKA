// src/utils/helpers.js
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'd MMMM yyyy, EEEE', { locale: ru });
};

export const formatTime = (timeString) => {
  return timeString.replace('-', '–');
};

export const calculateEndTime = (startTime, duration) => {
  const [hours, minutes] = startTime.split(':').map(Number);
  const durationMatch = duration.match(/(\d+)\s*час/);
  const durationHours = durationMatch ? parseInt(durationMatch[1]) : 0;
  const minutesMatch = duration.match(/(\d+)\s*мин/);
  const durationMinutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;

  const totalMinutes = hours * 60 + minutes + durationHours * 60 + durationMinutes;
  const endHours = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;

  return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
};

export const getEventCategoryColor = (category) => {
  const colors = {
    'Концерт': 'var(--concert)',
    'Внутривузовская активность': 'var(--activity)',
    'Общественное мероприятие': 'var(--public)',
    'Соревнование': 'var(--competition)',
    'Лекция': 'var(--accent)',
    'Мастер-класс': 'var(--warning)'
  };
  return colors[category] || 'var(--accent)';
};