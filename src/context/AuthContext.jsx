import { createContext, useContext, useState, useEffect } from 'react'
import { login as apiLogin, logout as apiLogout } from '../api/auth'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Для временного тестирования - загружаем тестового пользователя
    const testUser = {
      id: 1,
      name: "Иван Иванов",
      email: "test@bgitu.ru",
      role: "teacher", // или "student"
      avatar: null,
      department: "Кафедра информационных технологий",
      group: "ИСТ-123" // для студентов
    };
    
    setUser(testUser);
    localStorage.setItem('afisha_user', JSON.stringify(testUser));
    
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const userData = await apiLogin(credentials)
    setUser(userData)
    localStorage.setItem('afisha_user', JSON.stringify(userData))
    return userData
  }

  const logout = () => {
    apiLogout()
    setUser(null)
    localStorage.removeItem('afisha_user')
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isTeacher: user?.role === 'teacher',
    isStudent: user?.role === 'student'
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)