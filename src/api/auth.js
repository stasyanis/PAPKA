import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials)
  return response.data
}

export const logout = async () => {
  await axios.post(`${API_URL}/auth/logout`)
}

export const getUserProfile = async () => {
  const response = await axios.get(`${API_URL}/auth/profile`)
  return response.data
}