<?php
/**
 * API - Buscar Pedido por ID
 * 
 * Endpoint: GET /api/pedidos/read.php?id=1
 * 
 * Response:
 * {
 *   "status": "success",
 *   "data": {
 *     "id": 1,
 *     "tipo": "anuncio",
 *     ...
 *   }
 * }
 */

require_once '../config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

try {
    $userId = validateSession();
    
    if (!isset($_GET['id'])) {
        sendJsonResponse(['status' => 'error', 'message' => 'ID é obrigatório'], 400);
    }
    
    $pedidoId = (int)$_GET['id'];
    
    // MODO MOCK
    if (MOCK_MODE) {
        $mockPedidos = [
            [
                'id' => 1,
                'user_id' => $userId,
                'tipo' => 'anuncio',
                'texto' => 'Promoção de verão! Descontos de até 50% em toda loja.',
                'observacoes' => 'Locução masculina, tom animado',
                'urgencia' => 'alta',
                'status' => 'pendente',
                'audio_url' => null,
                'created_at' => '2024-01-15 10:30:00',
                'updated_at' => '2024-01-15 10:30:00'
            ]
        ];
        
        $pedido = array_filter($mockPedidos, fn($p) => $p['id'] === $pedidoId);
        $pedido = reset($pedido);
        
        if (!$pedido) {
            sendJsonResponse(['status' => 'error', 'message' => 'Pedido não encontrado'], 404);
        }
        
        sendJsonResponse(['status' => 'success', 'data' => $pedido]);
    }
    
    // MODO PRODUÇÃO
    $database = new Database();
    $db = $database->getConnection();
    
    $query = "SELECT * FROM pedidos WHERE id = :id AND user_id = :user_id LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $pedidoId, PDO::PARAM_INT);
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $stmt->execute();
    
    $pedido = $stmt->fetch();
    
    if (!$pedido) {
        sendJsonResponse(['status' => 'error', 'message' => 'Pedido não encontrado'], 404);
    }
    
    sendJsonResponse(['status' => 'success', 'data' => $pedido]);
    
} catch (Exception $e) {
    error_log("Erro ao buscar pedido: " . $e->getMessage());
    sendJsonResponse(['status' => 'error', 'message' => 'Erro ao buscar pedido'], 500);
}
