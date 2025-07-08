// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-logo">БГИТУ Афиша</div>
          <p className="footer-about">
            Агрегатор мероприятий Брянского государственного инженерно-технологического университета. 
            Здесь вы найдете информацию о всех событиях, концертах, лекциях и активностях нашего вуза.
          </p>
          <div className="subscribe-form">
            <input 
              type="email" 
              className="subscribe-input" 
              placeholder="Ваш email" 
            />
            <button className="subscribe-btn">Подписаться</button>
          </div>
        </div>
        
        <div>
          <div className="footer-title">Быстрые ссылки</div>
          <div className="footer-links">
            <Link to="/" className="footer-link">Главная</Link>
            <Link to="/events" className="footer-link">Календарь мероприятий</Link>
            <Link to="/" className="footer-link">Новостная лента</Link>
            <Link to="/events" className="footer-link">Мои мероприятия</Link>
            <Link to="/events/create" className="footer-link">Создать мероприятие</Link>
          </div>
        </div>
        
        <div>
          <div className="footer-title">Сайты вуза</div>
          <div className="footer-links">
            <a href="https://bgitu.ru" className="footer-link" target="_blank" rel="noopener noreferrer">Официальный сайт БГИТУ</a>
            <a href="https://compass.bgitu.ru" className="footer-link" target="_blank" rel="noopener noreferrer">Компас - Расписание</a>
            <a href="https://library.bgitu.ru" className="footer-link" target="_blank" rel="noopener noreferrer">Электронная библиотека</a>
            <a href="https://studsovet.bgitu.ru" className="footer-link" target="_blank" rel="noopener noreferrer">Студенческий совет</a>
            <a href="https://research.bgitu.ru" className="footer-link" target="_blank" rel="noopener noreferrer">Научные публикации</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="copyright">© 2025 БГИТУ. Все права защищены.</div>
        <div className="developer">Проект компании "Содружество независимых друзей"</div>
      </div>
    </footer>
  );
};

export default Footer;