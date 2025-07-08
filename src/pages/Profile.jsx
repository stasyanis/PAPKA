// src/pages/Profile.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';



const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: null,
    notifications: {
      newEvents: true,
      changes: true,
      news: false
    }
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        avatar: user.avatar || null,
        notifications: user.notifications || {
          newEvents: true,
          changes: true,
          news: false
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked
      }
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
  };

  if (!user) return <div>Загрузка профиля...</div>;

  return (
    <div className="profile-page">
      <h2 className="section-title">Настройки профиля</h2>
      
      <div className="avatar-container">
        <div className="avatar-preview">
          {formData.avatar ? (
            <img src={formData.avatar} alt="Аватар" className="avatar-image" />
          ) : (
            <i className="fas fa-user fa-2x"></i>
          )}
        </div>
        <div>
          <input 
            type="file" 
            id="avatar-upload" 
            accept="image/*" 
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
          <Button 
            onClick={() => document.getElementById('avatar-upload').click()}
          >
            Загрузить фото
          </Button>
          <p>Рекомендуемый размер: 300×300 px</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Имя</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Роль</label>
          <input
            type="text"
            value={user.role === 'teacher' ? 'Преподаватель' : 'Студент'}
            disabled
          />
        </div>
        
        {user.role === 'student' && (
          <div className="form-group">
            <label>Группа</label>
            <input
              type="text"
              value={user.group || ''}
              disabled
            />
          </div>
        )}
        
        {user.role === 'teacher' && (
          <div className="form-group">
            <label>Кафедра</label>
            <input
              type="text"
              value={user.department || ''}
              disabled
            />
          </div>
        )}
        
        <div className="form-group">
          <label>Уведомления</label>
          <div className="notifications-settings">
            <label>
              <input
                type="checkbox"
                name="newEvents"
                checked={formData.notifications.newEvents}
                onChange={handleCheckboxChange}
              />
              Новые мероприятия
            </label>
            <label>
              <input
                type="checkbox"
                name="changes"
                checked={formData.notifications.changes}
                onChange={handleCheckboxChange}
              />
              Изменения в моих мероприятиях
            </label>
            <label>
              <input
                type="checkbox"
                name="news"
                checked={formData.notifications.news}
                onChange={handleCheckboxChange}
              />
              Новости университета
            </label>
          </div>
        </div>
        
        <div className="form-actions">
          <Button type="button">Отмена</Button>
          <Button type="submit" primary>Сохранить изменения</Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;