import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext'; // Исправлен импорт
import NotificationModal from './NotificationModal';

const NotificationBell = () => {
  const {
    notifications = [],
    markNotificationAsRead
  } = useAppContext();
  
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const handleBellClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markNotificationAsRead(notification.id);
    }
    setIsDropdownOpen(false);
  };

  const handleCreateNotification = () => {
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };

  return (
    <div className="notification-container">
      <div className="header-icon" onClick={handleBellClick}>
        <i className="fas fa-bell"></i>
        {unreadCount > 0 && (
          <div className="notification-count">{unreadCount}</div>
        )}
      </div>

      {isDropdownOpen && (
        <div className={`dropdown notification-dropdown ${isDropdownOpen ? 'active' : ''}`}>
          <div className="dropdown-header">Уведомления</div>
          {notifications.length === 0 ? (
            <div className="dropdown-item">Нет уведомлений</div>
          ) : (
            <>
              {notifications.slice(0, 5).map(notification => (
                <div
                  key={notification.id}
                  className={`dropdown-item ${notification.read ? '' : 'unread'}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <i className={`fas fa-${
                    notification.type === 'new' ? 'calendar-plus' :
                    notification.type === 'change' ? 'edit' :
                    notification.type === 'complete' ? 'check-circle' : 'info-circle'
                  }`}></i>
                  {notification.message}
                </div>
              ))}
            </>
          )}
          <div className="dropdown-item" onClick={handleCreateNotification}>
            <i className="fas fa-plus"></i>
            Создать уведомление
          </div>
        </div>
      )}

      {isModalOpen && (
        <NotificationModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default NotificationBell;