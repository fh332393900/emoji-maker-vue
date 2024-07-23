import { createI18n } from 'vue-i18n';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import { useDayJs } from '../hooks/useDayJs';

type LocaleObjectData = {
  code: string,
  name: string,
}

const messages = {
  en: {
    action: {
      exportPNG: 'Export PNG',
      exportSVG: 'Export SVG',
      reload: 'Reload',
      close: 'Close',
    },
    appInfo: {
      built_at: "Built {0}",
      views: 'Views: ',
      app_ready: 'Application is ready',
      app_update_notice: 'New content available, click the reload button to update.',
    },
  },
  'zh-cn': {
    action: {
      exportPNG: '导出 PNG',
      exportSVG: '导出 SVG',
      reload: '重新加载',
      close: '关闭',
    },
    appInfo: {
      built_at: '构建于 {0}',
      views: '浏览量：',
      app_ready: '应用已就绪',
      app_update_notice: '新内容可用，点击重新加载按钮以更新。',
    },
  },
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
