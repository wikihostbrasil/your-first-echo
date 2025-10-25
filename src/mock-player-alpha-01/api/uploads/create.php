<?php
/**
 * API - Upload de Arquivo
 * Endpoint: POST /api/uploads/create.php
 * Content-Type: multipart/form-data
 * Form field: arquivo
 */

require_once '../config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['status' => 'error', 'message' => 'Método não permitido'], 405);
}

try {
    $userId = validateSession();
    
    // Verifica se arquivo foi enviado
    if (!isset($_FILES['arquivo']) || $_FILES['arquivo']['error'] !== UPLOAD_ERR_OK) {
        sendJsonResponse(['status' => 'error', 'message' => 'Nenhum arquivo enviado'], 400);
    }
    
    $arquivo = $_FILES['arquivo'];
    $nomeArquivo = sanitizeInput($arquivo['name']);
    $tipoMime = $arquivo['type'];
    $tamanho = $arquivo['size'];
    
    // Validações
    $extensoesPermitidas = ['mp3', 'wav', 'ogg', 'mp4'];
    $extensao = strtolower(pathinfo($nomeArquivo, PATHINFO_EXTENSION));
    
    if (!in_array($extensao, $extensoesPermitidas)) {
        sendJsonResponse(['status' => 'error', 'message' => 'Tipo de arquivo não permitido'], 400);
    }
    
    // Limite de 10MB
    if ($tamanho > 10 * 1024 * 1024) {
        sendJsonResponse(['status' => 'error', 'message' => 'Arquivo muito grande (máximo 10MB)'], 400);
    }
    
    // MODO MOCK - Simula upload
    if (MOCK_MODE) {
        $novoUpload = [
            'id' => rand(100, 999),
            'nome_arquivo' => $nomeArquivo,
            'arquivo_url' => '/uploads/' . uniqid() . '_' . $nomeArquivo,
            'tipo_mime' => $tipoMime,
            'tamanho' => $tamanho,
            'status' => 'concluido',
            'created_at' => date('Y-m-d H:i:s')
        ];
        
        sendJsonResponse(['status' => 'success', 'message' => 'Upload realizado com sucesso', 'data' => $novoUpload], 201);
    }
    
    // MODO PRODUÇÃO - Salva arquivo
    $diretorioUpload = __DIR__ . '/../../uploads/';
    if (!is_dir($diretorioUpload)) {
        mkdir($diretorioUpload, 0755, true);
    }
    
    $nomeUnico = uniqid() . '_' . $nomeArquivo;
    $caminhoCompleto = $diretorioUpload . $nomeUnico;
    
    if (!move_uploaded_file($arquivo['tmp_name'], $caminhoCompleto)) {
        sendJsonResponse(['status' => 'error', 'message' => 'Erro ao salvar arquivo'], 500);
    }
    
    $database = new Database();
    $db = $database->getConnection();
    
    $arquivoUrl = '/uploads/' . $nomeUnico;
    $query = "INSERT INTO uploads (user_id, nome_arquivo, arquivo_url, tipo_mime, tamanho, status) 
              VALUES (:user_id, :nome_arquivo, :arquivo_url, :tipo_mime, :tamanho, 'concluido')";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $stmt->bindParam(':nome_arquivo', $nomeArquivo);
    $stmt->bindParam(':arquivo_url', $arquivoUrl);
    $stmt->bindParam(':tipo_mime', $tipoMime);
    $stmt->bindParam(':tamanho', $tamanho, PDO::PARAM_INT);
    $stmt->execute();
    
    sendJsonResponse(['status' => 'success', 'message' => 'Upload realizado com sucesso', 'data' => ['id' => $db->lastInsertId(), 'arquivo_url' => $arquivoUrl]], 201);
    
} catch (Exception $e) {
    error_log("Erro no upload: " . $e->getMessage());
    sendJsonResponse(['status' => 'error', 'message' => 'Erro ao realizar upload'], 500);
}
