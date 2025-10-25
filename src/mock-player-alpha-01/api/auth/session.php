<?php
/**
 * API - Verificar Sessão Ativa
 * 
 * Endpoint: GET /api/auth/session.php
 * 
 * Response:
 * {
 *   "status": "success",
 *   "data": {
 *     "authenticated": true,
 *     "user": {
 *       "id": 1,
 *       "name": "Nome do Usuário",
 *       "email": "usuario@email.com",
 *       "plan": "premium"
 *     }
 *   }
 * }
 */

require_once '../config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

try {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    // Verifica se existe sessão ativa
    if (isset($_SESSION['user_id'])) {
        sendJsonResponse([
            'status' => 'success',
            'data' => [
                'authenticated' => true,
                'user' => [
                    'id' => $_SESSION['user_id'],
                    'name' => $_SESSION['user_name'] ?? null,
                    'email' => $_SESSION['user_email'] ?? null,
                    'plan' => $_SESSION['user_plan'] ?? 'free'
                ]
            ]
        ]);
    } else {
        sendJsonResponse([
            'status' => 'success',
            'data' => [
                'authenticated' => false,
                'user' => null
            ]
        ]);
    }
    
} catch (Exception $e) {
    error_log("Erro ao verificar sessão: " . $e->getMessage());
    sendJsonResponse([
        'status' => 'error',
        'message' => 'Erro ao verificar sessão'
    ], 500);
}
