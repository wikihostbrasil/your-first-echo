<?php
/**
 * API - Criar Novo Pedido
 * 
 * Endpoint: POST /api/pedidos/create.php
 * 
 * Body (JSON):
 * {
 *   "tipo": "anuncio",
 *   "texto": "Texto do pedido",
 *   "observacoes": "Observações adicionais",
 *   "urgencia": "media"
 * }
 * 
 * Response:
 * {
 *   "status": "success",
 *   "message": "Pedido criado com sucesso",
 *   "data": {
 *     "id": 4,
 *     "tipo": "anuncio",
 *     ...
 *   }
 * }
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
    // Valida sessão do usuário
    $userId = validateSession();
    
    // Obtém dados do body JSON
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Valida campos obrigatórios
    if (empty($input['tipo']) || empty($input['texto'])) {
        sendJsonResponse([
            'status' => 'error',
            'message' => 'Tipo e texto são obrigatórios'
        ], 400);
    }
    
    // Valida tipo
    $tiposValidos = ['anuncio', 'vinheta', 'spot', 'institucional'];
    if (!in_array($input['tipo'], $tiposValidos)) {
        sendJsonResponse([
            'status' => 'error',
            'message' => 'Tipo inválido'
        ], 400);
    }
    
    // Sanitiza dados
    $tipo = sanitizeInput($input['tipo']);
    $texto = sanitizeInput($input['texto']);
    $observacoes = isset($input['observacoes']) ? sanitizeInput($input['observacoes']) : null;
    $urgencia = isset($input['urgencia']) ? sanitizeInput($input['urgencia']) : 'media';
    
    // Valida urgência
    $urgenciasValidas = ['baixa', 'media', 'alta', 'urgente'];
    if (!in_array($urgencia, $urgenciasValidas)) {
        $urgencia = 'media';
    }
    
    // MODO MOCK - Simula criação
    if (MOCK_MODE) {
        $novoPedido = [
            'id' => rand(100, 999),
            'user_id' => $userId,
            'tipo' => $tipo,
            'texto' => $texto,
            'observacoes' => $observacoes,
            'urgencia' => $urgencia,
            'status' => 'pendente',
            'audio_url' => null,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ];
        
        sendJsonResponse([
            'status' => 'success',
            'message' => 'Pedido criado com sucesso',
            'data' => $novoPedido
        ], 201);
    }
    
    // MODO PRODUÇÃO - Insere no banco
    $database = new Database();
    $db = $database->getConnection();
    
    $query = "INSERT INTO pedidos (user_id, tipo, texto, observacoes, urgencia) 
              VALUES (:user_id, :tipo, :texto, :observacoes, :urgencia)";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $stmt->bindParam(':tipo', $tipo);
    $stmt->bindParam(':texto', $texto);
    $stmt->bindParam(':observacoes', $observacoes);
    $stmt->bindParam(':urgencia', $urgencia);
    
    if ($stmt->execute()) {
        $pedidoId = $db->lastInsertId();
        
        // Busca o pedido criado
        $selectQuery = "SELECT * FROM pedidos WHERE id = :id";
        $selectStmt = $db->prepare($selectQuery);
        $selectStmt->bindParam(':id', $pedidoId, PDO::PARAM_INT);
        $selectStmt->execute();
        $pedido = $selectStmt->fetch();
        
        sendJsonResponse([
            'status' => 'success',
            'message' => 'Pedido criado com sucesso',
            'data' => $pedido
        ], 201);
    } else {
        throw new Exception('Erro ao inserir pedido');
    }
    
} catch (Exception $e) {
    error_log("Erro ao criar pedido: " . $e->getMessage());
    sendJsonResponse([
        'status' => 'error',
        'message' => 'Erro ao criar pedido'
    ], 500);
}
