import { useEffect } from 'react'
import { useEvents } from '../context/EventContext'
import Banner from '../components/sections/Banner'
import CategoryFilter from '../components/events/CategoryFilter'
import CalendarSection from '../components/sections/CalendarSection'
import NewsSection from '../components/sections/NewsSection'

const Home = () => {
  const { futureEvents, pastEvents, loadEvents, loading } = useEvents()

  useEffect(() => {
    loadEvents()
  }, [])

  if (loading) return <div className="loader">Загрузка мероприятий...</div>

  return (
    <div className="home-page">
      <CategoryFilter />
      
      <Banner events={futureEvents.slice(0, 3)} />
      
      <CalendarSection events={[...futureEvents, ...pastEvents]} />
      
      <NewsSection events={pastEvents} />
    </div>
  )
}

export default Home