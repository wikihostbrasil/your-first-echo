<?php
/**
 * API - Criar Nova Locução
 * Endpoint: POST /api/locucoes/create.php
 * Body: { "nome": "Nome da Locução", "arquivo_url": "/path/audio.mp3", "duracao": 30 }
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
    
    if (empty($input['nome']) || empty($input['arquivo_url'])) {
        sendJsonResponse(['status' => 'error', 'message' => 'Nome e arquivo são obrigatórios'], 400);
    }
    
    $nome = sanitizeInput($input['nome']);
    $arquivoUrl = sanitizeInput($input['arquivo_url'], 'url');
    $duracao = isset($input['duracao']) ? (int)$input['duracao'] : null;
    
    // MODO MOCK
    if (MOCK_MODE) {
        $novaLocucao = [
            'id' => rand(100, 999),
            'nome' => $nome,
            'arquivo_url' => $arquivoUrl,
            'duracao' => $duracao,
            'bloqueado' => false,
            'created_at' => date('Y-m-d H:i:s')
        ];
        
        sendJsonResponse(['status' => 'success', 'message' => 'Locução criada com sucesso', 'data' => $novaLocucao], 201);
    }
    
    // MODO PRODUÇÃO
    $database = new Database();
    $db = $database->getConnection();
    
    $query = "INSERT INTO locucoes (user_id, nome, arquivo_url, duracao) VALUES (:user_id, :nome, :arquivo_url, :duracao)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':arquivo_url', $arquivoUrl);
    $stmt->bindParam(':duracao', $duracao, PDO::PARAM_INT);
    $stmt->execute();
    
    sendJsonResponse(['status' => 'success', 'message' => 'Locução criada com sucesso', 'data' => ['id' => $db->lastInsertId()]], 201);
    
} catch (Exception $e) {
    error_log("Erro ao criar locução: " . $e->getMessage());
    sendJsonResponse(['status' => 'error', 'message' => 'Erro ao criar locução'], 500);
}
