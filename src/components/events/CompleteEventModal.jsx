import { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const CompleteEventModal = ({ event, onClose }) => {
  const [formData, setFormData] = useState({
    title: `Отчет: ${event?.title || 'Мероприятие'}`,
    summary: '',
    tasks: ['', '', ''],
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTaskChange = (index, value) => {
    const newTasks = [...formData.tasks];
    newTasks[index] = value;
    setFormData(prev => ({ ...prev, tasks: newTasks }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ 
      ...prev, 
      images: [...prev.images, ...newImages] 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Report submitted:', formData);
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Завершение мероприятия">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Заголовок новости</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Описание мероприятия</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="form-control"
            rows="4"
            placeholder="Расскажите о том, как прошло мероприятие"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Выполненные задачи</label>
          {formData.tasks.map((task, index) => (
            <input
              key={index}
              type="text"
              value={task}
              onChange={(e) => handleTaskChange(index, e.target.value)}
              className="form-control"
              placeholder={`Задача ${index + 1}`}
              style={{ marginBottom: '8px' }}
            />
          ))}
        </div>

        <div className="form-group">
          <label className="form-label">Фотоотчет</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="form-control"
          />
          <div className="event-gallery">
            {formData.images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`Preview ${index}`} 
                className="gallery-image"
              />
            ))}
          </div>
        </div>

        <div className="editor-actions">
          <Button type="button" onClick={onClose}>Отмена</Button>
          <Button type="submit" primary>Опубликовать отчет</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CompleteEventModal;