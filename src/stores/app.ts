import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => {
    const localLang = localStorage.getItem('lang') || 'en';
    return {
      language: localLang,
    };
  },
  actions: {
    setLanguage(lang: string) {
      localStorage.setItem('lang', lang);
      this.language = lang;
      console.log(this.language, '-------');
    },
  },
  getters: {
    getLanguage(state): string {
      return state.language;
    },
  },
});
