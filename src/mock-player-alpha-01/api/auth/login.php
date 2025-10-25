<?php
/**
 * API - Login de Usuário
 * 
 * Endpoint: POST /api/auth/login.php
 * 
 * Body (JSON):
 * {
 *   "email": "usuario@email.com",
 *   "password": "senha123"
 * }
 * 
 * Response:
 * {
 *   "status": "success",
 *   "message": "Login realizado com sucesso",
 *   "data": {
 *     "user_id": 1,
 *     "name": "Nome do Usuário",
 *     "email": "usuario@email.com",
 *     "plan": "premium"
 *   }
 * }
 */

require_once '../config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Verifica se é requisição POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse([
        'status' => 'error',
        'message' => 'Método não permitido'
    ], 405);
}

try {
    // Obtém dados do body JSON
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Valida campos obrigatórios
    if (empty($input['email']) || empty($input['password'])) {
        sendJsonResponse([
            'status' => 'error',
            'message' => 'Email e senha são obrigatórios'
        ], 400);
    }
    
    $email = sanitizeInput($input['email'], 'email');
    $password = $input['password']; // Não sanitiza senha antes de validar hash
    
    // MODO MOCK - Simula autenticação
    if (MOCK_MODE) {
        // Credenciais mock para teste
        $mockUsers = [
            [
                'id' => 1,
                'name' => 'João Silva',
                'email' => 'joao@email.com',
                'password' => 'teste123', // Em produção seria hash
                'plan' => 'premium',
                'avatar_url' => null
            ],
            [
                'id' => 2,
                'name' => 'Maria Santos',
                'email' => 'maria@email.com',
                'password' => 'teste123',
                'plan' => 'basic',
                'avatar_url' => null
            ]
        ];
        
        // Busca usuário no mock
        $user = null;
        foreach ($mockUsers as $mockUser) {
            if ($mockUser['email'] === $email && $mockUser['password'] === $password) {
                $user = $mockUser;
                break;
            }
        }
        
        if (!$user) {
            sendJsonResponse([
                'status' => 'error',
                'message' => 'Email ou senha incorretos'
            ], 401);
        }
        
        // Cria sessão
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['user_plan'] = $user['plan'];
        
        // Retorna dados do usuário
        sendJsonResponse([
            'status' => 'success',
            'message' => 'Login realizado com sucesso',
            'data' => [
                'user_id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'plan' => $user['plan'],
                'avatar_url' => $user['avatar_url']
            ]
        ]);
    }
    
    // MODO PRODUÇÃO - Com banco de dados
    $database = new Database();
    $db = $database->getConnection();
    
    // Busca usuário no banco
    $query = "SELECT id, name, email, password, plan, avatar_url FROM users WHERE email = :email LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    
    $user = $stmt->fetch();
    
    if (!$user || !password_verify($password, $user['password'])) {
        sendJsonResponse([
            'status' => 'error',
            'message' => 'Email ou senha incorretos'
        ], 401);
    }
    
    // Cria sessão
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['name'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['user_plan'] = $user['plan'];
    
    // Registra sessão no banco (opcional)
    $sessionId = session_id();
    $ipAddress = $_SERVER['REMOTE_ADDR'] ?? null;
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? null;
    $expiresAt = date('Y-m-d H:i:s', time() + 86400); // 24 horas
    
    $query = "INSERT INTO sessions (id, user_id, ip_address, user_agent, expires_at) 
              VALUES (:session_id, :user_id, :ip_address, :user_agent, :expires_at)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':session_id', $sessionId);
    $stmt->bindParam(':user_id', $user['id']);
    $stmt->bindParam(':ip_address', $ipAddress);
    $stmt->bindParam(':user_agent', $userAgent);
    $stmt->bindParam(':expires_at', $expiresAt);
    $stmt->execute();
    
    // Retorna dados do usuário
    sendJsonResponse([
        'status' => 'success',
        'message' => 'Login realizado com sucesso',
        'data' => [
            'user_id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'plan' => $user['plan'],
            'avatar_url' => $user['avatar_url']
        ]
    ]);
    
} catch (Exception $e) {
    error_log("Erro no login: " . $e->getMessage());
    sendJsonResponse([
        'status' => 'error',
        'message' => 'Erro ao realizar login'
    ], 500);
}
