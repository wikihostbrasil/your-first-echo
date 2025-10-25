<?php
/**
 * API - Criar Funcionário
 * Endpoint: POST /api/funcionarios/create.php
 * Body: { "nome": "Nome Completo", "cargo": "Cargo" }
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
    
    if (empty($input['nome'])) {
        sendJsonResponse(['status' => 'error', 'message' => 'Nome é obrigatório'], 400);
    }
    
    $nome = sanitizeInput($input['nome']);
    $cargo = isset($input['cargo']) ? sanitizeInput($input['cargo']) : null;
    
    // MODO MOCK
    if (MOCK_MODE) {
        $novoFuncionario = [
            'id' => rand(100, 999),
            'nome' => $nome,
            'cargo' => $cargo,
            'ativo' => true,
            'created_at' => date('Y-m-d H:i:s')
        ];
        
        sendJsonResponse(['status' => 'success', 'message' => 'Funcionário criado com sucesso', 'data' => $novoFuncionario], 201);
    }
    
    // MODO PRODUÇÃO
    $database = new Database();
    $db = $database->getConnection();
    
    $query = "INSERT INTO funcionarios (user_id, nome, cargo) VALUES (:user_id, :nome, :cargo)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':cargo', $cargo);
    $stmt->execute();
    
    sendJsonResponse(['status' => 'success', 'message' => 'Funcionário criado com sucesso', 'data' => ['id' => $db->lastInsertId()]], 201);
    
} catch (Exception $e) {
    error_log("Erro ao criar funcionário: " . $e->getMessage());
    sendJsonResponse(['status' => 'error', 'message' => 'Erro ao criar funcionário'], 500);
}
