import { createI18n } from 'vue-i18n';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import 'dayjs/locale/ja';
import 'dayjs/locale/ko';
import 'dayjs/locale/fr';

import { useDayJs } from '../hooks/useDayJs';
import en from './en.json';
import zhCN from './zh-cn.json';
import ja from './ja.json';
import ko from './ko.json';
import fr from './fr.json';

type LocaleObjectData = {
  code: string,
  name: string,
}
console.log(en, 'en');
console.log(en, 'en');
const messages = {
  en,
  'zh-cn': zhCN,
  ja,
  ko,
  fr,
};

export const locales: LocaleObjectData[] = [
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'zh-cn',
    name: '简体中文',
  },
  {
    code: 'ja',
    name: '日本語',
  },
  {
    code: 'ko',
    name: '한국어',
  },
  {
    code: 'fr',
    name: 'Français',
  },
];

const { changeLocale } = useDayJs();

function initLocalLang() {
  const localLang = localStorage.getItem('lang');
  if (!localLang) {
    localStorage.setItem('lang', 'en');
    changeLocale('en');
    return 'en';
  }
  changeLocale(localLang);
  return localLang;
}


export function setLocalLang(lang: string) {
  localStorage.setItem('lang', lang);
  changeLocale(lang);
}
const i18n = createI18n({
  legacy: false,
  locale: initLocalLang(), // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
});

export default i18n;
