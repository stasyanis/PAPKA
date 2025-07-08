import { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import Notifications from '../ui/Notification';

const Header = ({ onMyEventsClick, onHomeClick, onCreateEventClick }) => {
  const { user, logout } = useAppContext();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
  };

  return (
    <header className="header">
      <a href="#" className="logo-container" onClick={(e) => {
        e.preventDefault();
        onHomeClick();
      }}>
        <div className="logo">БГ</div>
        <div className="logo-text">БГИТУ <span>Афиша</span></div>
      </a>
      
      <div className="search-container">
        <i className="fas fa-search search-icon"></i>
        <input 
          type="text" 
          className="search-box" 
          placeholder="Поиск мероприятий..." 
        />
      </div>
      
      <div className="header-actions">
        <button 
          className="header-btn"
          onClick={onMyEventsClick}
        >
          <i className="fas fa-calendar-alt"></i>
          <span className="header-text">Мои мероприятия</span>
        </button>
        
        <button 
          className="header-btn primary"
          onClick={onCreateEventClick}
        >
          <i className="fas fa-plus"></i>
          <span className="header-text">Создать мероприятие</span>
        </button>
        
        <Notifications />
        
        <div className="profile-container" ref={profileRef}>
          <div 
            className="header-icon" 
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          >
            <i className="fas fa-user"></i>
          </div>
          
          {profileDropdownOpen && (
            <div className={`dropdown profile-dropdown ${profileDropdownOpen ? 'active' : ''}`}>
              <div className="dropdown-header">{user?.name || "Пользователь"}</div>
              <div className="dropdown-item" onClick={onMyEventsClick}>
                <i className="fas fa-calendar-check"></i>
                Мои мероприятия
              </div>
              <div className="dropdown-item">
                <i className="fas fa-cog"></i>
                Настройки
              </div>
              <div className="dropdown-item">
                <i className="fas fa-headset"></i>
                Обратиться к администратору
              </div>
              <div className="dropdown-item" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                Выйти
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;