<?php
/**
 * API - Deletar Pedido
 * 
 * Endpoint: DELETE /api/pedidos/delete.php
 * 
 * Body (JSON):
 * {
 *   "id": 1
 * }
 */

require_once '../config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE, POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['status' => 'error', 'message' => 'Método não permitido'], 405);
}

try {
    $userId = validateSession();
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['id'])) {
        sendJsonResponse(['status' => 'error', 'message' => 'ID é obrigatório'], 400);
    }
    
    $pedidoId = (int)$input['id'];
    
    // MODO MOCK
    if (MOCK_MODE) {
        sendJsonResponse([
            'status' => 'success',
            'message' => 'Pedido deletado com sucesso'
        ]);
    }
    
    // MODO PRODUÇÃO
    $database = new Database();
    $db = $database->getConnection();
    
    $query = "DELETE FROM pedidos WHERE id = :id AND user_id = :user_id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $pedidoId, PDO::PARAM_INT);
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $stmt->execute();
    
    if ($stmt->rowCount() === 0) {
        sendJsonResponse(['status' => 'error', 'message' => 'Pedido não encontrado'], 404);
    }
    
    sendJsonResponse([
        'status' => 'success',
        'message' => 'Pedido deletado com sucesso'
    ]);
    
} catch (Exception $e) {
    error_log("Erro ao deletar pedido: " . $e->getMessage());
    sendJsonResponse(['status' => 'error', 'message' => 'Erro ao deletar pedido'], 500);
}
