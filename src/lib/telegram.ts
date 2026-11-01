const PROXY_URL = import.meta.env.VITE_PROXY_URL as string | undefined;
const TG_TOKEN = import.meta.env.VITE_TG_TOKEN as string | undefined;
const TG_CHAT = import.meta.env.VITE_TG_CHAT as string | undefined;


export async function sendToTelegram(text: string): Promise<void> {
  if (PROXY_URL) {
    const res = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error(`Proxy error: ${res.status}`);
    return;
  }

  if (!TG_TOKEN || !TG_CHAT) {
    throw new Error('Telegram не настроен: отсутствуют VITE_PROXY_URL или VITE_TG_*');
  }

  const api = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`;
  const res = await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TG_CHAT, text }),
  });
  if (!res.ok) throw new Error(`Telegram error: ${res.status}`);
}
/*
npx wrangler secret put 9056564328:AAGvXUPO5fehCWyE9siAEJqV5W5qQiCpTRk
-5107070087
*/