import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useEvents } from '../context/EventContext'
import EventCard from '../components/events/EventCard'
import EventForm from '../components/events/EventForm'
import Button from '../components/ui/Button'

const Events = () => {
  const { isTeacher } = useAuth()
  const { futureEvents, pastEvents } = useEvents()
  const [activeTab, setActiveTab] = useState('upcoming')
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)

  const handleEdit = (event) => {
    setEditingEvent(event)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingEvent(null)
  }

  return (
    <div className="events-page">
      <h2 className="section-title">
        <i className="fas fa-calendar-check"></i> Мои мероприятия
      </h2>
      
      <div className="events-tabs">
        <button 
          className={`events-tab ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Будущие события
        </button>
        <button 
          className={`events-tab ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => setActiveTab('past')}
        >
          Прошедшие события
        </button>
      </div>
      
      <div className="events-content">
        {activeTab === 'upcoming' && (
          <div className="events-grid">
            {futureEvents.length > 0 ? (
              futureEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  showActions={isTeacher}
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <p>Нет запланированных мероприятий</p>
            )}
          </div>
        )}
        
        {activeTab === 'past' && (
          <div className="events-grid">
            {pastEvents.length > 0 ? (
              pastEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p>Нет завершенных мероприятий</p>
            )}
          </div>
        )}
      </div>
      
      {isTeacher && (
        <div className="create-event-btn">
          <Button primary icon="plus" onClick={() => setShowForm(true)}>
            Создать новое мероприятие
          </Button>
        </div>
      )}
      
      {showForm && (
        <EventForm 
          event={editingEvent} 
          onClose={handleFormClose} 
        />
      )}
    </div>
  )
}

export default Events