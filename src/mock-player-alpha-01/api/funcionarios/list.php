<?php
/**
 * API - Listar Funcionários
 * Endpoint: GET /api/funcionarios/list.php
 */

require_once '../config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

try {
    $userId = validateSession();
    
    // MODO MOCK
    if (MOCK_MODE) {
        $mockFuncionarios = [
            ['id' => 1, 'nome' => 'João Silva', 'cargo' => 'Gerente', 'ativo' => true, 'created_at' => '2024-01-05 10:00:00'],
            ['id' => 2, 'nome' => 'Maria Santos', 'cargo' => 'Vendedora', 'ativo' => true, 'created_at' => '2024-01-06 11:30:00'],
            ['id' => 3, 'nome' => 'Pedro Costa', 'cargo' => 'Caixa', 'ativo' => false, 'created_at' => '2024-01-07 09:15:00']
        ];
        
        sendJsonResponse(['status' => 'success', 'data' => $mockFuncionarios]);
    }
    
    // MODO PRODUÇÃO
    $database = new Database();
    $db = $database->getConnection();
    
    $query = "SELECT * FROM funcionarios WHERE user_id = :user_id ORDER BY nome ASC";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $stmt->execute();
    
    sendJsonResponse(['status' => 'success', 'data' => $stmt->fetchAll()]);
    
} catch (Exception $e) {
    error_log("Erro ao listar funcionários: " . $e->getMessage());
    sendJsonResponse(['status' => 'error', 'message' => 'Erro ao buscar funcionários'], 500);
}
