import { createClient } from "@vercel/kv";

const KV_REST_API_URL = import.meta.env.VITE_KV_REST_API_URL;
const KV_REST_API_TOKEN = import.meta.env.VITE_KV_REST_API_TOKEN;
/** kv 数据库 */
const kv = createClient({
  url: KV_REST_API_URL,
  token: KV_REST_API_TOKEN,
});

export default kv;
