// src/components/notifications/NotificationModal.jsx
import { useState } from 'react';
import { useEvents } from '../../context/EventContext';
import Modal from './Modal';
import Button from './Button';

const NotificationModal = ({ onClose }) => {
  const { events, sendEventNotification } = useEvents();
  const [formData, setFormData] = useState({
    eventId: '',
    template: 'change',
    content: '',
    recipients: 'all'
  });

  const templates = {
    change: 'Изменение времени: Мероприятие "[Название]" перенесено на [Дата] [Время]',
    new: 'Новое мероприятие: Приглашаем на [Название мероприятия] [Дата] [Время]',
    reminder: 'Напоминание: Завтра в [Время] состоится мероприятие "[Название]"'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      content: name === 'template' ? templates[value] : prev.content
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendEventNotification(
      formData.eventId,
      formData.content,
      formData.recipients
    );
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Создать уведомление">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Выберите мероприятие</label>
          <select
            name="eventId"
            value={formData.eventId}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Выберите мероприятие</option>
            {events.future.map(event => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Шаблон уведомления</label>
          <select
            name="template"
            value={formData.template}
            onChange={handleChange}
            className="form-control"
          >
            <option value="change">Изменение деталей</option>
            <option value="new">Новое мероприятие</option>
            <option value="reminder">Напоминание</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Текст уведомления</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="form-control"
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Получатели</label>
          <select
            name="recipients"
            value={formData.recipients}
            onChange={handleChange}
            className="form-control"
          >
            <option value="all">Все участники</option>
            <option value="confirmed">Только подтвердившие</option>
            <option value="pending">Только ожидающие подтверждения</option>
          </select>
        </div>

        <div className="editor-actions">
          <Button type="button" onClick={onClose}>Отмена</Button>
          <Button type="submit" primary>Отправить уведомление</Button>
        </div>
      </form>
    </Modal>
  );
};

export default NotificationModal;