<?php
/**
 * Configuração de Conexão com Banco de Dados
 * 
 * Este arquivo gerencia a conexão PDO com o banco de dados.
 * Atualmente configurado com MOCK_MODE para testes sem banco real.
 * 
 * Para usar com banco real:
 * 1. Defina MOCK_MODE como false
 * 2. Configure as credenciais do banco
 * 3. Execute as migrations em api/config/migrations.sql
 */

// Define se está em modo MOCK (sem banco) ou modo PRODUÇÃO (com banco)
define('MOCK_MODE', true);

// Configurações do Banco de Dados
define('DB_HOST', 'localhost');
define('DB_NAME', 'stream_player');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

/**
 * Classe Database - Gerencia conexão PDO
 */
class Database {
    private $conn = null;
    
    /**
     * Obtém conexão PDO com o banco
     * @return PDO|null Retorna conexão ou null se MOCK_MODE ativo
     */
    public function getConnection() {
        // Se está em modo MOCK, não conecta ao banco
        if (MOCK_MODE) {
            return null;
        }
        
        // Se já existe conexão, retorna
        if ($this->conn !== null) {
            return $this->conn;
        }
        
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
            
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            
            $this->conn = new PDO($dsn, DB_USER, DB_PASS, $options);
            
            return $this->conn;
            
        } catch(PDOException $e) {
            error_log("Erro de conexão: " . $e->getMessage());
            throw new Exception("Erro ao conectar com banco de dados");
        }
    }
    
    /**
     * Fecha a conexão com o banco
     */
    public function closeConnection() {
        $this->conn = null;
    }
}

/**
 * Função auxiliar para validar e sanitizar inputs
 */
function sanitizeInput($data, $type = 'string') {
    if ($data === null) {
        return null;
    }
    
    switch ($type) {
        case 'int':
            return filter_var($data, FILTER_SANITIZE_NUMBER_INT);
        case 'email':
            return filter_var($data, FILTER_SANITIZE_EMAIL);
        case 'url':
            return filter_var($data, FILTER_SANITIZE_URL);
        case 'string':
        default:
            return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
    }
}

/**
 * Função auxiliar para validar sessão de usuário
 */
function validateSession() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    // Em modo MOCK, cria sessão fake para testes
    if (MOCK_MODE && !isset($_SESSION['user_id'])) {
        $_SESSION['user_id'] = 1;
        $_SESSION['user_name'] = 'Usuário Teste';
        $_SESSION['user_email'] = 'usuario@teste.com';
        $_SESSION['user_plan'] = 'premium';
    }
    
    if (!isset($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode([
            'status' => 'error',
            'message' => 'Usuário não autenticado'
        ]);
        exit();
    }
    
    return $_SESSION['user_id'];
}

/**
 * Função auxiliar para enviar resposta JSON
 */
function sendJsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit();
}
