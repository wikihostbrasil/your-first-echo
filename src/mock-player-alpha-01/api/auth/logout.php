<?php
/**
 * API - Logout de Usuário
 * 
 * Endpoint: POST /api/auth/logout.php
 * 
 * Response:
 * {
 *   "status": "success",
 *   "message": "Logout realizado com sucesso"
 * }
 */

require_once '../config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

try {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    $userId = $_SESSION['user_id'] ?? null;
    $sessionId = session_id();
    
    // Remove sessão do banco (se não estiver em modo mock)
    if (!MOCK_MODE && $userId) {
        $database = new Database();
        $db = $database->getConnection();
        
        $query = "DELETE FROM sessions WHERE id = :session_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':session_id', $sessionId);
        $stmt->execute();
    }
    
    // Limpa variáveis de sessão
    $_SESSION = [];
    
    // Destrói o cookie de sessão
    if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(), '', time() - 3600, '/');
    }
    
    // Destrói a sessão
    session_destroy();
    
    sendJsonResponse([
        'status' => 'success',
        'message' => 'Logout realizado com sucesso'
    ]);
    
} catch (Exception $e) {
    error_log("Erro no logout: " . $e->getMessage());
    sendJsonResponse([
        'status' => 'error',
        'message' => 'Erro ao realizar logout'
    ], 500);
}
