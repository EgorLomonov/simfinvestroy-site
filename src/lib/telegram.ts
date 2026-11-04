export async function sendToTelegram(text: string): Promise<void> {
  // Отправляем на PHP-скрипт, который лежит в корне вашего сайта
  const res = await fetch('/send.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Ошибка сервера: ${error}`);
  }
}
