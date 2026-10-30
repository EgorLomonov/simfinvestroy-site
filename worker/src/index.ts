export interface Env {
  TG_TOKEN: string;
  TG_CHAT: string;
  ALLOWED_ORIGIN: string;
}

function cors(env: Env, request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') || '';
  const allowedOrigins = (env.ALLOWED_ORIGIN || '*').split(',').map((s) => s.trim());
  const allowOrigin = allowedOrigins.includes(origin) || allowedOrigins.includes('*') ? origin : allowedOrigins[0];

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Обработка preflight (CORS)
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors(env, request) });
    }

    // Принимаем только POST, путь не важен
    if (request.method !== 'POST') {
      return new Response('Method not allowed. Use POST.', {
        status: 405,
        headers: cors(env, request),
      });
    }

    try {
      const body = (await request.json()) as { text?: string };
      const text = (body?.text ?? '').toString().slice(0, 4000);

      if (!text.trim()) {
        return new Response(JSON.stringify({ error: 'Empty text' }), {
          status: 400,
          headers: { ...cors(env, request), 'Content-Type': 'application/json' },
        });
      }

      // Отправка в Telegram
      const tg = await fetch(
        `https://api.telegram.org/bot${env.TG_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: env.TG_CHAT, text }),
        }
      );

      const data = await tg.text();
      return new Response(data, {
        status: tg.status,
        headers: { ...cors(env, request), 'Content-Type': 'application/json' },
      });
    } catch (e) {
      return new Response(
        JSON.stringify({ error: (e as Error).message }),
        {
          status: 500,
          headers: { ...cors(env, request), 'Content-Type': 'application/json' },
        }
      );
    }
  },
};