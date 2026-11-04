<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

// Подключаем конфиг из папки выше
$configPath = dirname(__DIR__) . '/config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Config not found']);
    exit;
}
$config = require $configPath;

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!isset($data['text']) || empty(trim($data['text']))) {
    http_response_code(400);
    echo json_encode(['error' => 'Empty text']);
    exit;
}

// --- Защита от спама (Мера 2) ---
$text = trim($data['text']);

// 1. Ограничение длины (Telegram лимит 4096)
if (mb_strlen($text) > 4000) {
    http_response_code(400);
    echo json_encode(['error' => 'Text too long']);
    exit;
}

// 2. Проверка на слишком частые запросы с одного IP (простой лимит: 5 раз в минуту)
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$cacheFile = sys_get_temp_dir() . '/tg_form_' . md5($ip);
$now = time();

if (file_exists($cacheFile)) {
    $attempts = json_decode(file_get_contents($cacheFile), true) ?: [];
    $attempts = array_filter($attempts, fn($t) => $t > $now - 60); // оставляем только за последнюю минуту
    if (count($attempts) >= 5) {
        http_response_code(429);
        echo json_encode(['error' => 'Too many requests']);
        exit;
    }
    $attempts[] = $now;
} else {
    $attempts = [$now];
}
file_put_contents($cacheFile, json_encode($attempts));

// 3. Проверка на явные ссылки (боты часто шлют спам с URL)
if (preg_match('/https?:\/\//i', $text)) {
    http_response_code(400);
    echo json_encode(['error' => 'Links not allowed']);
    exit;
}

// --- Отправка в Telegram ---
$url = "https://api.telegram.org/bot{$config['token']}/sendMessage";
$post_fields = [
    'chat_id' => $config['chat_id'],
    'text' => $text
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_fields));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($http_code);
echo $response;