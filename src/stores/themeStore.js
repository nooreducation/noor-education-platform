import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
    persist(
        (set) => ({
            theme: 'light',
            toggleTheme: () => set((state) => {
                const newTheme = state.theme === 'light' ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                return { theme: newTheme };
            }),
            initTheme: () => {
                const savedTheme = localStorage.getItem('theme-storage');
                if (savedTheme) {
                    const { state } = JSON.parse(savedTheme);
                    document.documentElement.setAttribute('data-theme', state.theme);
                }
            }
        }),
        {
            name: 'theme-storage',
        }
    )
);
