import {shallow} from 'zustand/shallow';
import useAuthStore from '../stores/authStore';

export const useAuth = () => {
  const {user, token, login, logout, _hydrated} = useAuthStore(
    state => ({
      user: state.user,
      token: state.token,
      login: state.login,
      logout: state.logout,
      _hydrated: state._hydrated,
    }),
    shallow, // Important for preventing unnecessary re-renders
  );

  return {
    user,
    token,
    isAuthenticated: !!user,
    isLoading: !_hydrated,
    login,
    logout,
  };
};
