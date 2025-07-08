import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const CreateEventModal = ({ isOpen, onClose }) => {
  const { createEvent } = useAppContext();
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    title: '',
    category: 'Общественное мероприятие',
    date: '',
    time: '',
    duration: '2 часа',
    location: '',
    description: '',
    maxParticipants: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = createEvent(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="close-modal" onClick={onClose}>
          <i className="fas fa-times"></i>
        </div>
        <div className="modal-content">
          <div className="event-editor">
            <div className="editor-header">
              <h2 className="editor-title">Создание мероприятия</h2>
              <div className="editor-tabs">
                <button 
                  className={`editor-tab ${activeTab === 'basic' ? 'active' : ''}`}
                  onClick={() => setActiveTab('basic')}
                >
                  Основное
                </button>
                <button 
                  className={`editor-tab ${activeTab === 'participants' ? 'active' : ''}`}
                  onClick={() => setActiveTab('participants')}
                >
                  Участники
                </button>
                <button 
                  className={`editor-tab ${activeTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  Уведомления
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              {activeTab === 'basic' && (
                <div className="editor-section">
                  <h3 className="editor-section-title">Информация о мероприятии</h3>
                  
                  <div className="form-group">
                    <label className="form-label">Название мероприятия</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="form-control"
                      required
                      placeholder="Введите название"
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-col">
                      <div className="form-group">
                        <label className="form-label">Категория</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="form-control"
                          required
                        >
                          <option>Концерт</option>
                          <option>Внутривузовская активность</option>
                          <option>Общественное мероприятие</option>
                          <option>Соревнование</option>
                          <option>Лекция</option>
                          <option>Мастер-класс</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-col">
                      <div className="form-group">
                        <label className="form-label">Дата</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-col">
                      <div className="form-group">
                        <label className="form-label">Время начала</label>
                        <input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-col">
                      <div className="form-group">
                        <label className="form-label">Продолжительность</label>
                        <input
                          type="text"
                          name="duration"
                          value={formData.duration}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Например, 2 часа"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Место проведения</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="form-control"
                      required
                      placeholder="Аудитория 101, ул. Станке Димитрова, 3"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Описание</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="form-control"
                      rows="4"
                      placeholder="Подробное описание мероприятия"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Максимальное количество участников</label>
                    <input
                      type="number"
                      name="maxParticipants"
                      value={formData.maxParticipants}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="0 - без ограничений"
                    />
                  </div>
                </div>
              )}
              
              {activeTab === 'participants' && (
                <div className="editor-section">
                  <h3 className="editor-section-title">Управление участниками</h3>
                  <p>Функционал участников будет реализован после подключения бэкенда</p>
                </div>
              )}
              
              {activeTab === 'notifications' && (
                <div className="editor-section">
                  <h3 className="editor-section-title">Уведомления участникам</h3>
                  <p>Функционал уведомлений будет реализован после подключения бэкенда</p>
                </div>
              )}
              
              <div className="editor-actions">
                <button 
                  type="button" 
                  className="editor-btn btn-cancel"
                  onClick={onClose}
                >
                  Отмена
                </button>
                <button 
                  type="submit" 
                  className="editor-btn btn-save"
                >
                  Сохранить мероприятие
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;