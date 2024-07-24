import kv from './index';

/** 获取浏览量 */
export const getViews = async () => {
  const views: null | number = await kv.get('views');
  return views;
};

/** 设置浏览量 */
export const setViews = async (views: number) => {
  kv.set('views', views);
};
