import { createI18n } from 'vue-i18n';

type LocaleObjectData = {
  code: string,
  name: string,
}

const messages = {
  en: {
    action: {
      exportPNG: 'Export PNG',
      exportSVG: 'Export SVG',
    },
  },
  zh: {
    action: {
      exportPNG: '导出 PNG',
      exportSVG: '导出 SVG',
    },
  },
};

export const locales: LocaleObjectData[] = [
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'zh',
    name: '简体中文',
  },
];

function getLocalLang() {
  const localLang = localStorage.getItem('lang');
  if (!localLang) {
    localStorage.setItem('lang', 'en');
    return 'en';
  }
  return localLang;
}
const i18n = createI18n({
  legacy: false,
  locale: getLocalLang(), // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
});

export default i18n;
