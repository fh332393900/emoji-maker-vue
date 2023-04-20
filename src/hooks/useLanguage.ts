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
    code: 'zh',
    name: '简体中文',
  },
];
export function useLanguage() {
  
  return { locales, t };
}
