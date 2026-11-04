<?php
declare(strict_types=1);

/**
 * Приём заявок с сайта simf-invest-stroy.ru
 * Каналы: e-mail (mail/SMTP) + MAX-бот + журнал заявок.
 * Конфиг: ../config.php (вне public_html).
 *
 * Поддерживает два формата запроса:
 *   1) новый: {name, phone, city, kvm, page, ts, website}
 *   2) старый: {text} — временно, пока не обновлён фронтенд.
 */

mb_internal_encoding('UTF-8');
date_default_timezone_set('Europe/Moscow');

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $status, array $data): void
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function clean_text($value, int $maxLength): string
{
    $value = is_string($value) ? $value : '';
    $value = strip_tags($value);
    $value = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value) ?? '';
    $value = preg_replace('/\s+/u', ' ', $value) ?? '';
    $value = trim($value);
    return mb_substr($value, 0, $maxLength, 'UTF-8');
}

function check_rate_limit(string $ip, int $limit = 5, int $window = 60): void
{
    $file = sys_get_temp_dir() . '/simf_rate_' . md5($ip);
    $handle = @fopen($file, 'c+');
    if (!$handle) {
        return;
    }
    if (!flock($handle, LOCK_EX)) {
        fclose($handle);
        return;
    }
    $now = time();
    $times = json_decode((string) stream_get_contents($handle), true);
    $times = is_array($times) ? $times : [];
    $times = array_values(array_filter($times, static function ($time) use ($now, $window): bool {
        return is_int($time) && $time > $now - $window;
    }));
    if (count($times) >= $limit) {
        flock($handle, LOCK_UN);
        fclose($handle);
        respond(429, ['error' => 'Слишком много заявок. Подождите минуту и попробуйте снова.']);
    }
    $times[] = $now;
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($times));
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
}

function send_email(array $cfg, string $subject, string $body): array
{
    $to = trim((string) ($cfg['to'] ?? ''));
    $from = trim((string) ($cfg['from'] ?? ''));
    if ($to === '' || $from === '') {
        return [false, 'email: не настроен'];
    }

    if (!empty($cfg['smtp']['enabled']) && !empty($cfg['smtp']['host'])) {
        return smtp_send($cfg['smtp'], $from, $to, $subject, $body);
    }

    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $headers = implode("\r\n", [
        'From: ' . $from,
        'Reply-To: ' . $from,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ]);

    $ok = @mail($to, $encodedSubject, $body, $headers, '-f' . $from);
    if (!$ok) {
        $ok = @mail($to, $encodedSubject, $body, $headers);
    }
    return [$ok, $ok ? 'email: ok' : 'email: mail() failed'];
}

function smtp_send(array $cfg, string $from, string $to, string $subject, string $body): array
{
    $host = trim((string) ($cfg['host'] ?? ''));
    $port = (int) ($cfg['port'] ?? 465);
    $secure = strtolower(trim((string) ($cfg['secure'] ?? 'ssl')));
    $user = (string) ($cfg['user'] ?? '');
    $pass = (string) ($cfg['pass'] ?? '');
    if ($host === '') {
        return [false, 'email: smtp host не задан'];
    }

    $remote = ($secure === 'ssl' ? 'ssl://' : '') . $host . ':' . $port;
    $context = stream_context_create([
        'ssl' => ['verify_peer' => true, 'verify_peer_name' => true],
    ]);
    $fp = @stream_socket_client($remote, $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $context);
    if (!$fp) {
        return [false, 'email: connect ' . $errno . ' ' . $errstr];
    }
    stream_set_timeout($fp, 15);

    $read = static function () use ($fp): string {
        $response = '';
        while (($line = fgets($fp, 1024)) !== false) {
            $response .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') {
                break;
            }
        }
        return $response;
    };
    $code = static function (string $response): int {
        return (int) substr($response, 0, 3);
    };
    $expect = static function (string $response, array $codes) use ($code): void {
        if (!in_array($code($response), $codes, true)) {
            throw new RuntimeException(trim($response));
        }
    };
    $send = static function (string $command) use ($fp, $read): string {
        fwrite($fp, $command . "\r\n");
        return $read();
    };

    try {
        $expect($read(), [220]);
        $expect($send('EHLO simf-invest-stroy.ru'), [250]);

        if ($secure === 'tls') {
            $expect($send('STARTTLS'), [220]);
            if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('TLS handshake failed');
            }
            $expect($send('EHLO simf-invest-stroy.ru'), [250]);
        }

        if ($user !== '') {
            $expect($send('AUTH LOGIN'), [334]);
            $expect($send(base64_encode($user)), [334]);
            $expect($send(base64_encode($pass)), [235]);
        }

        $expect($send('MAIL FROM:<' . $from . '>'), [250]);
        $expect($send('RCPT TO:<' . $to . '>'), [250, 251]);
        $expect($send('DATA'), [354]);

        $normalized = str_replace("\n", "\r\n", str_replace("\r\n", "\n", $body));
        $normalized = preg_replace('/^\./m', '..', $normalized) ?? $normalized;

        $headers = implode("\r\n", [
            'Subject: =?UTF-8?B?' . base64_encode($subject) . '?=',
            'From: ' . $from,
            'To: ' . $to,
            'Date: ' . date('r'),
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
        ]);
        fwrite($fp, $headers . "\r\n\r\n" . $normalized . "\r\n.\r\n");
        $expect($read(), [250]);
        $send('QUIT');
        fclose($fp);
        return [true, 'email: smtp ok'];
    } catch (Throwable $e) {
        @fclose($fp);
        return [false, 'email: ' . $e->getMessage()];
    }
}

function send_max(array $cfg, string $text): array
{
    $token = trim((string) ($cfg['token'] ?? ''));
    $chatId = trim((string) ($cfg['chat_id'] ?? ''));
    $userId = trim((string) ($cfg['user_id'] ?? ''));
    if ($token === '' || ($chatId === '' && $userId === '')) {
        return [false, 'max: не настроен'];
    }

    $query = $chatId !== '' ? 'chat_id=' . rawurlencode($chatId) : 'user_id=' . rawurlencode($userId);
    $url = 'https://platform-api2.max.ru/messages?' . $query;
    $payload = json_encode(['text' => $text, 'notify' => true], JSON_UNESCAPED_UNICODE);
    $verifySsl = !isset($cfg['verify_ssl']) || $cfg['verify_ssl'] !== false;

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        $options = [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_HTTPHEADER => ['Authorization: ' . $token, 'Content-Type: application/json'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => 5,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_SSL_VERIFYPEER => $verifySsl,
            CURLOPT_SSL_VERIFYHOST => $verifySsl ? 2 : 0,
        ];
        if (!empty($cfg['ca_info'])) {
            $options[CURLOPT_CAINFO] = (string) $cfg['ca_info'];
        }
        curl_setopt_array($ch, $options);
        $response = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = (string) curl_error($ch);
        curl_close($ch);

        if ($response !== false && $status >= 200 && $status < 300) {
            return [true, 'max: ok'];
        }
        return [false, 'max: HTTP ' . $status . ' ' . ($response === false ? $error : substr((string) $response, 0, 200))];
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Authorization: {$token}\r\nContent-Type: application/json\r\n",
            'content' => $payload,
            'timeout' => 10,
            'ignore_errors' => true,
        ],
        'ssl' => ['verify_peer' => $verifySsl, 'verify_peer_name' => $verifySsl],
    ]);
    $response = @file_get_contents($url, false, $context);
    $status = 0;
    if (isset($http_response_header[0]) && preg_match('/\s(\d{3})\s/', $http_response_header[0], $m)) {
        $status = (int) $m[1];
    }
    if ($response !== false && $status >= 200 && $status < 300) {
        return [true, 'max: ok'];
    }
    return [false, 'max: HTTP ' . $status];
}

function log_request(string $logFile, array $fields): void
{
    @file_put_contents($logFile, implode("\t", $fields) . PHP_EOL, FILE_APPEND | LOCK_EX);
}

/* ------------------------------------------------------------------ */

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['error' => 'Метод не поддерживается']);
}

$configCandidates = [];
$envConfigPath = getenv('SIMF_CONFIG');
if (is_string($envConfigPath) && $envConfigPath !== '') {
    $configCandidates[] = $envConfigPath;
}
$configCandidates[] = dirname(__DIR__) . '/config.php';
$configCandidates[] = dirname(__DIR__, 2) . '/config.php';
$configCandidates[] = dirname(__DIR__, 3) . '/config.php';

$configPath = '';
foreach ($configCandidates as $candidate) {
    if (is_file($candidate)) {
        $configPath = $candidate;
        break;
    }
}
if ($configPath === '') {
    respond(500, ['error' => 'Сервис временно недоступен']);
}
$config = require $configPath;
if (!is_array($config)) {
    respond(500, ['error' => 'Сервис временно недоступен']);
}

$allowedOrigins = array_map(
    'strtolower',
    array_filter((array) ($config['allowed_origins'] ?? []), 'is_string')
);
$source = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
$sourceHost = strtolower((string) parse_url((string) $source, PHP_URL_HOST));
if ($sourceHost === '' || !in_array($sourceHost, $allowedOrigins, true)) {
    respond(403, ['error' => 'Запрос отклонён. Обновите страницу и попробуйте снова.']);
}

$rawBody = (string) file_get_contents('php://input');
$data = json_decode($rawBody, true);
if (!is_array($data)) {
    parse_str($rawBody, $data);
}

$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
check_rate_limit($ip);

$logFile = (string) ($config['log_file'] ?? (dirname($configPath) . '/requests.log'));
$emailCfg = (array) ($config['email'] ?? []);
$maxCfg = (array) ($config['max'] ?? []);

/* --- Временная поддержка старого формата: {"text": "..."} --- */

$legacyText = isset($data['text']) && is_string($data['text']) ? trim($data['text']) : '';
if ($legacyText !== '') {
    if (mb_strlen($legacyText) > 4000) {
        respond(400, ['error' => 'Слишком длинное сообщение']);
    }

    $emailResult = send_email($emailCfg, 'Заявка с сайта (старая форма)', $legacyText);
    $maxResult = send_max($maxCfg, $legacyText);

    log_request($logFile, [
        date('c'),
        $ip,
        'legacy',
        str_replace(["\r", "\n"], ' / ', mb_substr($legacyText, 0, 200, 'UTF-8')),
        $emailResult[1],
        $maxResult[1],
    ]);

    if (!$emailResult[0] && !$maxResult[0]) {
        respond(502, ['error' => 'Не удалось отправить заявку. Позвоните нам: +7 (978) 541-41-64.']);
    }
    respond(200, ['ok' => true]);
}

/* --- Новый формат --- */

// Ловушка для ботов: поле должно остаться пустым
if (trim((string) ($data['website'] ?? '')) !== '') {
    respond(200, ['ok' => true]);
}

// Защита от мгновенной отправки (боты не ждут)
$sentAt = isset($data['ts']) ? (int) $data['ts'] : 0;
$nowMs = (int) round(microtime(true) * 1000);
$elapsed = $nowMs - $sentAt;
if ($sentAt <= 0 || $elapsed > 86400000 || ($elapsed >= 0 && $elapsed < 1200)) {
    respond(400, ['error' => 'Форма отправлена слишком быстро. Обновите страницу и попробуйте снова.']);
}

$name = clean_text($data['name'] ?? '', 60);
$phone = clean_text($data['phone'] ?? '', 30);
$city = clean_text($data['city'] ?? '', 60);
$areaRaw = clean_text($data['kvm'] ?? '', 12);
$page = clean_text($data['page'] ?? '', 200);
$digits = preg_replace('/\D+/', '', $phone) ?? '';
$area = (float) str_replace(',', '.', $areaRaw);

$errors = [];
if (mb_strlen($name) < 2) {
    $errors['name'] = 'Укажите имя';
}
if (strlen($digits) < 10 || strlen($digits) > 15) {
    $errors['phone'] = 'Укажите корректный телефон';
}
if (mb_strlen($city) < 2) {
    $errors['city'] = 'Укажите город';
}
if ($area < 1 || $area > 1000) {
    $errors['kvm'] = 'Укажите площадь от 1 до 1000 м²';
}
if (preg_match('/https?:\/\/|www\.|<\/?a[\s>]/i', $name . ' ' . $city . ' ' . $page)) {
    $errors['spam'] = 'Ссылки в заявке не допускаются';
}
if ($errors) {
    respond(422, ['error' => 'Проверьте поля формы', 'fields' => $errors]);
}

$areaLabel = rtrim(rtrim(number_format($area, 1, '.', ''), '0'), '.');
$subject = 'Заявка с сайта: ' . $name . ', ' . $phone;
$message = implode("\n", [
    'Новая заявка с сайта',
    '',
    'Имя: ' . $name,
    'Телефон: ' . $phone,
    'Город: ' . $city,
    'Площадь: ' . $areaLabel . ' м²',
    '',
    'Страница: ' . ($page !== '' ? $page : '/'),
    'Время: ' . date('d.m.Y H:i'),
    'IP: ' . $ip,
]);

$emailResult = send_email($emailCfg, $subject, $message);
$maxResult = send_max($maxCfg, $message);

log_request($logFile, [
    date('c'),
    $ip,
    $name,
    $phone,
    $city,
    $areaRaw,
    $page,
    $emailResult[1],
    $maxResult[1],
]);

if (!$emailResult[0] && !$maxResult[0]) {
    respond(502, ['error' => 'Не удалось отправить заявку. Позвоните нам: +7 (978) 541-41-64.']);
}
respond(200, ['ok' => true]);
