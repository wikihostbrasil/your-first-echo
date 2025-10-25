<?php
/**
 * API - Criar Sugestão de Veículo
 * Endpoint: POST /api/veiculos/create-sugestao.php
 * Body: { "tipo": "novo_veiculo", "texto": "Sugestão aqui", "email": "contato@email.com" }
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
    
    if (empty($input['tipo']) || empty($input['texto'])) {
        sendJsonResponse(['status' => 'error', 'message' => 'Tipo e texto são obrigatórios'], 400);
    }
    
    $tipo = sanitizeInput($input['tipo']);
    $texto = sanitizeInput($input['texto']);
    $email = isset($input['email']) ? sanitizeInput($input['email'], 'email') : null;
    
    // MODO MOCK
    if (MOCK_MODE) {
        $novaSugestao = [
            'id' => rand(100, 999),
            'tipo' => $tipo,
            'texto' => $texto,
            'email' => $email,
            'status' => 'pendente',
            'created_at' => date('Y-m-d H:i:s')
        ];
        
        sendJsonResponse(['status' => 'success', 'message' => 'Sugestão de veículo enviada com sucesso', 'data' => $novaSugestao], 201);
    }
    
    // MODO PRODUÇÃO
    $database = new Database();
    $db = $database->getConnection();
    
    $query = "INSERT INTO veiculos_sugestoes (user_id, tipo, texto, email) VALUES (:user_id, :tipo, :texto, :email)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $stmt->bindParam(':tipo', $tipo);
    $stmt->bindParam(':texto', $texto);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    
    sendJsonResponse(['status' => 'success', 'message' => 'Sugestão de veículo enviada com sucesso', 'data' => ['id' => $db->lastInsertId()]], 201);
    
} catch (Exception $e) {
    error_log("Erro ao enviar sugestão de veículo: " . $e->getMessage());
    sendJsonResponse(['status' => 'error', 'message' => 'Erro ao enviar sugestão'], 500);
}
