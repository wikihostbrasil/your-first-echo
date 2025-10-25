<?php
/**
 * API - Listar Pedidos do Usuário
 * 
 * Endpoint: GET /api/pedidos/list.php
 * 
 * Query params (opcionais):
 * - status: filtrar por status (pendente, em_producao, concluido, cancelado)
 * - limit: número de registros (padrão: 50)
 * - offset: paginação (padrão: 0)
 * 
 * Response:
 * {
 *   "status": "success",
 *   "data": [
 *     {
 *       "id": 1,
 *       "tipo": "anuncio",
 *       "texto": "Texto do pedido",
 *       "observacoes": "Observações adicionais",
 *       "urgencia": "media",
 *       "status": "pendente",
 *       "audio_url": null,
 *       "created_at": "2024-01-15 10:30:00"
 *     }
 *   ]
 * }
 */

require_once '../config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

try {
    // Valida sessão do usuário
    $userId = validateSession();
    
    // Obtém parâmetros de query
    $status = isset($_GET['status']) ? sanitizeInput($_GET['status']) : null;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 50;
    $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
    
    // MODO MOCK - Retorna dados simulados
    if (MOCK_MODE) {
        $mockPedidos = [
            [
                'id' => 1,
                'tipo' => 'anuncio',
                'texto' => 'Promoção de verão! Descontos de até 50% em toda loja.',
                'observacoes' => 'Locução masculina, tom animado',
                'urgencia' => 'alta',
                'status' => 'pendente',
                'audio_url' => null,
                'created_at' => '2024-01-15 10:30:00',
                'updated_at' => '2024-01-15 10:30:00'
            ],
            [
                'id' => 2,
                'tipo' => 'vinheta',
                'texto' => 'Sua loja favorita, agora com delivery!',
                'observacoes' => 'Locução feminina, tom profissional',
                'urgencia' => 'media',
                'status' => 'em_producao',
                'audio_url' => null,
                'created_at' => '2024-01-14 15:20:00',
                'updated_at' => '2024-01-15 09:00:00'
            ],
            [
                'id' => 3,
                'tipo' => 'spot',
                'texto' => 'Black Friday chegando! Não perca nossas ofertas.',
                'observacoes' => null,
                'urgencia' => 'urgente',
                'status' => 'concluido',
                'audio_url' => '/audio/pedidos/spot_003.mp3',
                'created_at' => '2024-01-13 08:15:00',
                'updated_at' => '2024-01-14 10:45:00'
            ]
        ];
        
        // Filtra por status se especificado
        if ($status) {
            $mockPedidos = array_filter($mockPedidos, function($pedido) use ($status) {
                return $pedido['status'] === $status;
            });
        }
        
        // Aplica paginação
        $mockPedidos = array_slice($mockPedidos, $offset, $limit);
        
        sendJsonResponse([
            'status' => 'success',
            'data' => array_values($mockPedidos),
            'total' => count($mockPedidos)
        ]);
    }
    
    // MODO PRODUÇÃO - Busca no banco de dados
    $database = new Database();
    $db = $database->getConnection();
    
    // Monta query com filtros
    $query = "SELECT id, tipo, texto, observacoes, urgencia, status, audio_url, 
                     created_at, updated_at 
              FROM pedidos 
              WHERE user_id = :user_id";
    
    if ($status) {
        $query .= " AND status = :status";
    }
    
    $query .= " ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    
    if ($status) {
        $stmt->bindParam(':status', $status);
    }
    
    $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
    
    $stmt->execute();
    $pedidos = $stmt->fetchAll();
    
    // Conta total de registros
    $countQuery = "SELECT COUNT(*) as total FROM pedidos WHERE user_id = :user_id";
    if ($status) {
        $countQuery .= " AND status = :status";
    }
    
    $countStmt = $db->prepare($countQuery);
    $countStmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    if ($status) {
        $countStmt->bindParam(':status', $status);
    }
    $countStmt->execute();
    $total = $countStmt->fetch()['total'];
    
    sendJsonResponse([
        'status' => 'success',
        'data' => $pedidos,
        'total' => $total
    ]);
    
} catch (Exception $e) {
    error_log("Erro ao listar pedidos: " . $e->getMessage());
    sendJsonResponse([
        'status' => 'error',
        'message' => 'Erro ao buscar pedidos'
    ], 500);
}
