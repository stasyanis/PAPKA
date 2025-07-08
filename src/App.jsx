import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/layout/Header';
import CategoryFilter from './components/events/CategoryFilter';
import Banner from './components/sections/Banner';
import CalendarSection from './components/sections/CalendarSection';
import NewsSection from './components/sections/NewsSection';
import Footer from './components/layout/Footer';
import MyEventsPage from './pages/MyEventsPage';
import CreateEventModal from './components/events/CreateEventModal';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [events] = useState([
    {
      id: 1,
      title: "День открытых дверей БГИТУ",
      category: "Общественное мероприятие",
      date: "2025-07-15",
      time: "10:00 - 14:00",
      location: "Главный корпус, ауд. 301",
      description: "Приглашаем абитуриентов и их родителей на ежегодный День открытых дверей...",
      maxParticipants: 150,
      currentParticipants: 98,
      isPast: false,
      images: [],
      report: null
    },
    {
      id: 101,
      title: "Уборка Центрального парка",
      category: "Волонтерская активность",
      date: "2025-07-10",
      time: "09:00 - 13:00",
      location: "Центральный парк, Брянск",
      description: "Волонтеры БГИТУ провели масштабную уборку Центрального парка.",
      isPast: true,
      images: [
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      ],
      report: {
        comment: "За 4 часа было собрано более 50 мешков мусора...",
        tasks: ["Сбор мусора", "Покраска скамеек"]
      }
    }
  ]);

  const renderContent = () => {
    if (activePage === 'my-events') {
      return <MyEventsPage />;
    }
    
    return (
      <>
        <CategoryFilter />
        <Banner events={events} />
        <CalendarSection events={events} />
        <NewsSection events={events.filter(event => event.isPast && event.report)} />
      </>
    );
  };

  return (
    <AppProvider>
      <div className="app">
        <Header 
          onMyEventsClick={() => setActivePage('my-events')}
          onHomeClick={() => setActivePage('home')}
          onCreateEventClick={() => setCreateModalOpen(true)}
        />
        
        <main>
          {renderContent()}
        </main>
        
        <Footer />
        
        <CreateEventModal 
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
        />
      </div>
    </AppProvider>
  );
}

export default App;