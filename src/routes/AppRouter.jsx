import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home'
import Events from '../pages/Events'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
// import EventDetailsPage from ''
const AppRouter = () => {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="events/:id" element={<EventDetailsPage />} />
          <Route path="events" element={<Events />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
  )
}

export default AppRouter