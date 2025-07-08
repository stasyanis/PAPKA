// src/store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login, logout, getUserProfile } from '../api/auth';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      
      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const user = await login(credentials);
          set({ user, loading: false });
          return user;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },
      
      logout: async () => {
        await logout();
        set({ user: null });
      },
      
      fetchProfile: async () => {
        set({ loading: true });
        try {
          const user = await getUserProfile();
          set({ user, loading: false });
          return user;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },
      
      updateProfile: async (profileData) => {
        set({ loading: true });
        try {
          // Здесь будет вызов API для обновления профиля
          set(state => ({ 
            user: { ...state.user, ...profileData },
            loading: false 
          }));
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useAuthStore;