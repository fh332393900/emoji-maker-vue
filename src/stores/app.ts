import { getViews, setViews } from '@/kv/views';
import { defineStore } from 'pinia';


export const useAppStore = defineStore('app', {
  state: () => {
    const localLang = localStorage.getItem('lang') || 'en';
    const views = 0;
    return {
      language: localLang,
      views,
    };
  },
  actions: {
    setLanguage(lang: string) {
      localStorage.setItem('lang', lang);
      this.language = lang;
    },
    async initViews() {
      const views = await getViews();
      this.views  = views || 0;
      console.log(views, 'views');
      setViews(this.views + 1);
    },
  },
  getters: {
    getLanguage(state): string {
      return state.language;
    },
  },
});
