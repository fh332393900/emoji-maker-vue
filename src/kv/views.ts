import { createClient } from "@vercel/kv";

const KV_REST_API_URL = import.meta.env.VITE_KV_REST_API_URL;
const KV_REST_API_TOKEN = import.meta.env.VITE_KV_REST_API_TOKEN;
console.log(import.meta.env);
console.log(process.env);
const kv = createClient({
  url: KV_REST_API_URL,
  token: KV_REST_API_TOKEN,
});
export const getViews = async () => {
  const views: null | number = await kv.get('views');
  return views;
};

export const setViews = async (views: number) => {
  kv.set('views', views);
};
