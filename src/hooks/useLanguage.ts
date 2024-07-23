import { useI18n } from "vue-i18n";

const { t } = useI18n();

type LocaleObjectData = {
  code: string,
  name: string,
}

const locales: LocaleObjectData[] = [
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
export function useLanguage() {
  
  return { locales, t };
}
