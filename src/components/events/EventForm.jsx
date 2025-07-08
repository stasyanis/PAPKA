import { useState, useEffect } from 'react'
import { useEvents } from '../../context/EventContext'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

const EventForm = ({ event, onClose }) => {
  const { addEvent, editEvent } = useEvents()
  const [activeTab, setActiveTab] = useState('basic')
  const [formData, setFormData] = useState({
    title: '',
    category: 'Общественное мероприятие',
    date: '',
    time: '',
    duration: '2 часа',
    location: '',
    description: '',
    maxParticipants: 0
  })
  
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        category: event.category,
        date: event.date.split('T')[0],
        time: event.time.split(' - ')[0],
        duration: event.duration,
        location: event.location,
        description: event.description,
        maxParticipants: event.maxParticipants || 0
      })
    }
  }, [event])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const eventData = {
      ...formData,
      date: new Date(formData.date).toISOString(),
      time: `${formData.time} - ${calculateEndTime(formData.time, formData.duration)}`
    }
    
    try {
      if (event) {
        await editEvent(event.id, eventData)
      } else {
        await addEvent(eventData)
      }
      onClose()
    } catch (error) {
      console.error('Ошибка сохранения:', error)
    }
  }

  const calculateEndTime = (startTime, duration) => {
    // Реализация расчета времени окончания
  }

  return (
    <Modal isOpen={true} onClose={onClose} title={event ? "Редактирование мероприятия" : "Создание мероприятия"}>
      <form onSubmit={handleSubmit}>
        <div className="editor-tabs">
          <button 
            type="button"
            className={`editor-tab ${activeTab === 'basic' ? 'active' : ''}`}
            onClick={() => setActiveTab('basic')}
          >
            Основное
          </button>
          <button 
            type="button"
            className={`editor-tab ${activeTab === 'participants' ? 'active' : ''}`}
            onClick={() => setActiveTab('participants')}
          >
            Участники
          </button>
          <button 
            type="button"
            className={`editor-tab ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            Уведомления
          </button>
        </div>
        
        <div className="editor-section">
          {/* Поля формы */}
          <div className="form-group">
            <label className="form-label">Название мероприятия</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          
          {/* Остальные поля формы */}
          
          <div className="editor-actions">
            <Button type="button" onClick={onClose}>Отмена</Button>
            <Button type="submit" primary>Сохранить мероприятие</Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default EventForm