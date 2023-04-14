export type Theme = 'light' | 'dark';

export function useTheme() {
  /**
   * 设置主题模式
   * @param {Theme} theme 主题
   * @return {Theme} 主题
   */
  const setTheme = (theme: Theme = 'light') => {
    document.querySelector('html')?.setAttribute('class', `${theme}`);
    localStorage.setItem('theme', theme);
    return theme;
  };

  const getTheme = () => {
    const currentTheme = localStorage.getItem('theme');
    console.log(currentTheme, 'currentTheme');
    return currentTheme ? currentTheme as Theme : 'light';
  };

  return { setTheme, getTheme };
}
