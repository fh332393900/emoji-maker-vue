import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

export function useDayJs() {
  // dayjs插件
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);

  const changeLocale = (lang: string) => {
    dayjs.locale(lang);
  };

  return { dayjs, changeLocale };
}
