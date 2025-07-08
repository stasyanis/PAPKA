import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const fetchEvents = async () => {
  const response = await axios.get(`${API_URL}/events`)
  return response.data
}

export const fetchEventById = async (id) => {
  const response = await axios.get(`${API_URL}/events/${id}`)
  return response.data
}

export const createEvent = async (eventData) => {
  const response = await axios.post(`${API_URL}/events`, eventData)
  return response.data
}

export const updateEvent = async (id, updates) => {
  const response = await axios.put(`${API_URL}/events/${id}`, updates)
  return response.data
}

export const deleteEvent = async (id) => {
  await axios.delete(`${API_URL}/events/${id}`)
}

export const completeEvent = async (id, reportData) => {
  const response = await axios.post(`${API_URL}/events/${id}/complete`, reportData)
  return response.data
}

export const registerForEvent = async (eventId) => {
  const response = await axios.post(`${API_URL}/events/${eventId}/register`)
  return response.data
}

export const sendNotification = async (eventId, notificationData) => {
  const response = await axios.post(`${API_URL}/events/${eventId}/notify`, notificationData)
  return response.data
}