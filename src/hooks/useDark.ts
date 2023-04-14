export type Theme = 'light' | 'dark';
import { useThemeStore } from '../stores/theme';

export function useTheme() {
  /**
   * 设置主题模式
   * @param {Theme} theme 主题
   * @return {Theme} 主题
   */
  const setTheme = (theme: Theme = 'light') => {
    const store = useThemeStore();
    document.querySelector('html')?.setAttribute('class', `${theme}`);
    localStorage.setItem('theme', theme);
    store.setTheme(theme);
    return theme;
  };

  const getTheme = () => {
    const currentTheme = localStorage.getItem('theme');
    console.log(currentTheme, 'currentTheme');
    return currentTheme ? currentTheme as Theme : 'light';
  };

  return { setTheme, getTheme };
}
