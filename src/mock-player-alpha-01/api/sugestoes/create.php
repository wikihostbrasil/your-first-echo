<?php
/**
 * API - Enviar Sugestão
 * Endpoint: POST /api/sugestoes/create.php
 * Body: { "texto": "Minha sugestão", "tipo": "feature" }
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
    
    if (empty($input['texto'])) {
        sendJsonResponse(['status' => 'error', 'message' => 'Texto é obrigatório'], 400);
    }
    
    $texto = sanitizeInput($input['texto']);
    $tipo = isset($input['tipo']) ? sanitizeInput($input['tipo']) : 'outro';
    
    // MODO MOCK
    if (MOCK_MODE) {
        $novaSugestao = [
            'id' => rand(100, 999),
            'texto' => $texto,
            'tipo' => $tipo,
            'status' => 'nova',
            'created_at' => date('Y-m-d H:i:s')
        ];
        
        sendJsonResponse(['status' => 'success', 'message' => 'Sugestão enviada com sucesso', 'data' => $novaSugestao], 201);
    }
    
    // MODO PRODUÇÃO
    $database = new Database();
    $db = $database->getConnection();
    
    $query = "INSERT INTO sugestoes (user_id, texto, tipo) VALUES (:user_id, :texto, :tipo)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $stmt->bindParam(':texto', $texto);
    $stmt->bindParam(':tipo', $tipo);
    $stmt->execute();
    
    sendJsonResponse(['status' => 'success', 'message' => 'Sugestão enviada com sucesso', 'data' => ['id' => $db->lastInsertId()]], 201);
    
} catch (Exception $e) {
    error_log("Erro ao enviar sugestão: " . $e->getMessage());
    sendJsonResponse(['status' => 'error', 'message' => 'Erro ao enviar sugestão'], 500);
}
