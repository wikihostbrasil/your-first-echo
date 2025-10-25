<?php
/**
 * API - Listar Locuções do Usuário
 * Endpoint: GET /api/locucoes/list.php
 */

require_once '../config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

try {
    $userId = validateSession();
    
    // MODO MOCK
    if (MOCK_MODE) {
        $mockLocucoes = [
            ['id' => 1, 'nome' => 'Promoção Verão', 'arquivo_url' => '/audio/locucao_001.mp3', 'duracao' => 30, 'bloqueado' => false, 'created_at' => '2024-01-10 14:20:00'],
            ['id' => 2, 'nome' => 'Vinheta Abertura', 'arquivo_url' => '/audio/locucao_002.mp3', 'duracao' => 15, 'bloqueado' => false, 'created_at' => '2024-01-12 09:15:00'],
            ['id' => 3, 'nome' => 'Chamada Delivery', 'arquivo_url' => '/audio/locucao_003.mp3', 'duracao' => 20, 'bloqueado' => true, 'created_at' => '2024-01-14 16:30:00']
        ];
        
        sendJsonResponse(['status' => 'success', 'data' => $mockLocucoes]);
    }
    
    // MODO PRODUÇÃO
    $database = new Database();
    $db = $database->getConnection();
    
    $query = "SELECT * FROM locucoes WHERE user_id = :user_id ORDER BY created_at DESC";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $stmt->execute();
    
    sendJsonResponse(['status' => 'success', 'data' => $stmt->fetchAll()]);
    
} catch (Exception $e) {
    error_log("Erro ao listar locuções: " . $e->getMessage());
    sendJsonResponse(['status' => 'error', 'message' => 'Erro ao buscar locuções'], 500);
}
