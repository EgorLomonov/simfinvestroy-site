export interface RequestPayload {
  name: string;
  phone: string;
  city: string;
  kvm: string;
  page: string;
  ts: number;
  website: string;
}

export async function sendRequest(payload: RequestPayload): Promise<void> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch('/send.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      let message = 'Не удалось отправить заявку. Попробуйте ещё раз.';
      try {
        const data = (await response.json()) as { error?: string };
        if (data && typeof data.error === 'string' && data.error !== '') {
          message = data.error;
        }
      } catch {
        // Ответ не JSON — оставляем общий текст.
      }
      throw new Error(message);
    }
  } finally {
    window.clearTimeout(timer);
  }
}
