// 1. stores/authStore.js (Revised)
import {create} from 'zustand';
import {persist, createJSONStorage, devtools} from 'zustand/middleware';
import {zustandStorage} from './storage';

export const useAuthStore = create(
  persist(
    set => ({
      user: null,
      token: null,
      // Remove hydration state from store
      actions: {
        login: userData => set({user: userData.user, token: userData.token}),
        logout: () => set({user: null, token: null}),
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => zustandStorage),
      partialize: state => ({
        user: state.user,
        token: state.token,
      }),
    },
  ),
);

const countStore = (set, get) => ({
  count: 0,
  increaseBy5: () => set(state => ({count: state.count + 5})),
  increment: () => set(state => ({count: state.count + 1})),
  decrement: () => set(state => ({count: state.count - 1})),

  reset: () => set(state => ({count: 0})),
});

export const useCountStore = create(
  devtools(
    persist(countStore, {
      name: 'count-storage',
      storage: createJSONStorage(() => zustandStorage),
    }),
  ),
);

const courseStore = set => ({
  courses: [],
  addCourse: course => set(state => ({courses: [course, ...state.courses]})),
  removeCourse: course =>
    set(state => ({courses: state.courses.filter(c => c.id !== course)})),
  toggleStatus: course =>
    set(state => ({
      courses: state.courses.map(c =>
        c.id === course ? {...c, status: !c.status} : c,
      ),
    })),
});

export const useCourseStore = create(
  devtools(
    persist(courseStore, {
      name: 'course-storage',
      storage: createJSONStorage(() => zustandStorage),
    }),
  ),
);

// Selector hooks for better memoization
export const useUser = () => useAuthStore(state => state.user);
export const useToken = () => useAuthStore(state => state.token);
export const useAuthActions = () => useAuthStore(state => state.actions);
