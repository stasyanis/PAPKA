// src/components/events/EventActions.jsx
import { useState } from 'react';
import CompleteEventModal from './CompleteEventModal';
import Button from '../ui/Button';

const EventActions = ({ event, onEdit }) => {
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  return (
    <div className="event-card-actions">
      {!event.isPast && (
        <>
          <Button 
            className="edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(event);
            }}
          >
            Редактировать
          </Button>
          
          <Button 
            className="complete-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsCompleteModalOpen(true);
            }}
          >
            Завершить
          </Button>
        </>
      )}
      
      {isCompleteModalOpen && (
        <CompleteEventModal 
          event={event}
          onClose={() => setIsCompleteModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default EventActions;