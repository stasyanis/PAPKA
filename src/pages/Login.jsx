// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { login } from '../api/auth';

const Login = () => {
  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const user = await login(credentials);
      setUser(user);
      navigate('/');
    } catch (err) {
      setError('Неверные учетные данные. Проверьте email и пароль.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-container">
            <div className="logo">БГ</div>
            <div className="logo-text">БГИТУ <span>Афиша</span></div>
          </div>
          <h2>Вход в систему</h2>
          <p>Используйте учетные данные БГИТУ</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              placeholder="user@bgitu.ru"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
              disabled={loading}
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <Button 
            type="submit" 
            primary 
            fullWidth
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Вход...' : 'Войти'}
          </Button>
        </form>
        
        <div className="login-footer">
          <p>Нет аккаунта? Обратитесь к администратору системы</p>
          <p>
            <a href="#">Забыли пароль?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;