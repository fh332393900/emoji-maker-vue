import { defineStore } from 'pinia';
import { useTheme, type Theme } from '@/hooks/useDark';

const { getTheme } = useTheme();

export const useThemeStore = defineStore('theme', {
  state: () => {
    return {
      theme: 'light' as Theme,
    };
  },
  actions: {
    setTheme(theme: Theme) {
      this.theme = theme;
    },
  },
  getters: {
    getTheme(state): Theme {
      state.theme = getTheme();
      return state.theme;
    },
  },
});
