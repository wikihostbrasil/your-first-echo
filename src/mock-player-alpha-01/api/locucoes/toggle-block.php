<?php
/**
 * API - Bloquear/Desbloquear Locução
 * Endpoint: POST /api/locucoes/toggle-block.php
 * Body: { "id": 1 }
 */

require_once '../config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['status' => 'error', 'message' => 'Método não permitido'], 405);
}

try {
    $userId = validateSession();
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['id'])) {
        sendJsonResponse(['status' => 'error', 'message' => 'ID é obrigatório'], 400);
    }
    
    $locucaoId = (int)$input['id'];
    
    // MODO MOCK
    if (MOCK_MODE) {
        sendJsonResponse(['status' => 'success', 'message' => 'Status de bloqueio alterado', 'data' => ['bloqueado' => true]]);
    }
    
    // MODO PRODUÇÃO
    $database = new Database();
    $db = $database->getConnection();
    
    // Alterna o status de bloqueio
    $query = "UPDATE locucoes SET bloqueado = NOT bloqueado WHERE id = :id AND user_id = :user_id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $locucaoId, PDO::PARAM_INT);
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $stmt->execute();
    
    if ($stmt->rowCount() === 0) {
        sendJsonResponse(['status' => 'error', 'message' => 'Locução não encontrada'], 404);
    }
    
    sendJsonResponse(['status' => 'success', 'message' => 'Status de bloqueio alterado']);
    
} catch (Exception $e) {
    error_log("Erro ao alterar bloqueio: " . $e->getMessage());
    sendJsonResponse(['status' => 'error', 'message' => 'Erro ao alterar bloqueio'], 500);
}
