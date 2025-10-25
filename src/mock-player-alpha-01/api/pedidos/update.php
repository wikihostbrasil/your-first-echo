<?php
/**
 * API - Atualizar Pedido
 * 
 * Endpoint: PUT /api/pedidos/update.php
 * 
 * Body (JSON):
 * {
 *   "id": 1,
 *   "texto": "Novo texto",
 *   "observacoes": "Novas observações",
 *   "urgencia": "alta"
 * }
 */

require_once '../config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'PUT' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
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
        $response = [
            'id' => $pedidoId,
            'texto' => isset($input['texto']) ? sanitizeInput($input['texto']) : null,
            'observacoes' => isset($input['observacoes']) ? sanitizeInput($input['observacoes']) : null,
            'urgencia' => isset($input['urgencia']) ? sanitizeInput($input['urgencia']) : null,
            'updated_at' => date('Y-m-d H:i:s')
        ];
        
        sendJsonResponse([
            'status' => 'success',
            'message' => 'Pedido atualizado com sucesso',
            'data' => $response
        ]);
    }
    
    // MODO PRODUÇÃO
    $database = new Database();
    $db = $database->getConnection();
    
    // Verifica se pedido pertence ao usuário
    $checkQuery = "SELECT id FROM pedidos WHERE id = :id AND user_id = :user_id";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(':id', $pedidoId, PDO::PARAM_INT);
    $checkStmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $checkStmt->execute();
    
    if (!$checkStmt->fetch()) {
        sendJsonResponse(['status' => 'error', 'message' => 'Pedido não encontrado'], 404);
    }
    
    // Monta query de atualização
    $updates = [];
    $params = [':id' => $pedidoId];
    
    if (isset($input['texto'])) {
        $updates[] = "texto = :texto";
        $params[':texto'] = sanitizeInput($input['texto']);
    }
    if (isset($input['observacoes'])) {
        $updates[] = "observacoes = :observacoes";
        $params[':observacoes'] = sanitizeInput($input['observacoes']);
    }
    if (isset($input['urgencia'])) {
        $updates[] = "urgencia = :urgencia";
        $params[':urgencia'] = sanitizeInput($input['urgencia']);
    }
    
    if (empty($updates)) {
        sendJsonResponse(['status' => 'error', 'message' => 'Nenhum campo para atualizar'], 400);
    }
    
    $query = "UPDATE pedidos SET " . implode(', ', $updates) . " WHERE id = :id";
    $stmt = $db->prepare($query);
    
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    
    $stmt->execute();
    
    sendJsonResponse([
        'status' => 'success',
        'message' => 'Pedido atualizado com sucesso'
    ]);
    
} catch (Exception $e) {
    error_log("Erro ao atualizar pedido: " . $e->getMessage());
    sendJsonResponse(['status' => 'error', 'message' => 'Erro ao atualizar pedido'], 500);
}
