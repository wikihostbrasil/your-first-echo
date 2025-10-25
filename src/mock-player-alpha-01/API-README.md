# 📘 API Integration Guide - Stream Player Alpha 01

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Estrutura de Arquivos](#-estrutura-de-arquivos)
3. [Configuração Inicial](#-configuração-inicial)
4. [Como Usar a API](#-como-usar-a-api)
5. [Endpoints Disponíveis](#-endpoints-disponíveis)
6. [Modo MOCK vs Produção](#-modo-mock-vs-produção)
7. [Integração com Frontend](#-integração-com-frontend)
8. [Criar Novos Endpoints](#-criar-novos-endpoints)
9. [Adicionar Modals/Drawers](#-adicionar-modalsdrawers)
10. [Segurança](#-segurança)
11. [Troubleshooting](#-troubleshooting)

---

## 🎯 Visão Geral

Este projeto integra um layout HTML/CSS/JS com uma **API REST em PHP** organizada e modular. A API suporta **modo MOCK** (sem banco de dados) para testes e desenvolvimento, e pode ser facilmente migrada para **modo PRODUÇÃO** com banco de dados real.

### Características principais:
- ✅ API REST completa em PHP
- ✅ Sistema CRUD para todas as seções
- ✅ Modo MOCK com dados simulados
- ✅ Validação e sanitização de dados
- ✅ Tratamento de erros robusto
- ✅ Sessões PHP para autenticação
- ✅ JavaScript modular para integração
- ✅ Comentários explicativos em todo código

---

## 📁 Estrutura de Arquivos

```
mock-player-alpha-01/
│
├── api/                          # Backend API REST
│   ├── config/
│   │   ├── database.php          # Conexão PDO e funções auxiliares
│   │   └── migrations.sql        # Schema do banco (para produção)
│   │
│   ├── auth/                     # Autenticação
│   │   ├── login.php
│   │   ├── logout.php
│   │   └── session.php
│   │
│   ├── pedidos/                  # Pedidos de gravação
│   │   ├── list.php
│   │   ├── create.php
│   │   ├── read.php
│   │   ├── update.php
│   │   └── delete.php
│   │
│   ├── locucoes/                 # Locuções
│   │   ├── list.php
│   │   ├── create.php
│   │   ├── delete.php
│   │   └── toggle-block.php
│   │
│   ├── funcionarios/             # Funcionários
│   │   ├── list.php
│   │   ├── create.php
│   │   └── delete.php
│   │
│   ├── sugestoes/                # Sugestões gerais
│   │   └── create.php
│   │
│   ├── veiculos/                 # Sugestões de veículos
│   │   └── create-sugestao.php
│   │
│   └── uploads/                  # Upload de arquivos
│       └── create.php
│
├── scripts/
│   ├── api-integration.js        # ⭐ Integração JS com API
│   ├── main.js
│   ├── modals.js
│   └── ...
│
├── index.html                    # Página principal
├── auth.html                     # Página de login
└── API-README.md                 # 📘 Este arquivo
```

---

## ⚙️ Configuração Inicial

### 1. Configurar API Base URL

Edite o arquivo `scripts/api-integration.js`:

```javascript
// Linha 20
const API_BASE_URL = 'http://localhost/stream-player/api';
```

Altere para o caminho correto do seu servidor local ou produção.

### 2. Modo MOCK (Padrão)

Por padrão, a API funciona em **modo MOCK** (sem banco de dados). Para usar:

- ✅ Nenhuma configuração adicional necessária
- ✅ Dados simulados já estão nos arquivos PHP
- ✅ Perfeito para desenvolvimento e testes

### 3. Modo PRODUÇÃO (Com Banco)

Para usar com banco de dados real:

**Passo 1:** Configure as credenciais do banco em `api/config/database.php`:

```php
define('MOCK_MODE', false); // ⚠️ Altere para false

define('DB_HOST', 'localhost');
define('DB_NAME', 'stream_player');
define('DB_USER', 'seu_usuario');
define('DB_PASS', 'sua_senha');
```

**Passo 2:** Execute as migrations:

```bash
mysql -u seu_usuario -p stream_player < api/config/migrations.sql
```

**Passo 3:** Pronto! A API agora usa o banco de dados.

---

## 🚀 Como Usar a API

### No JavaScript

A API está disponível globalmente através do objeto `window.API`:

```javascript
// Exemplo: Listar pedidos
const response = await API.pedidos.list();

if (response.status === 'success') {
    console.log(response.data); // Array de pedidos
}

// Exemplo: Criar pedido
const novoPedido = await API.pedidos.create({
    tipo: 'anuncio',
    texto: 'Promoção de verão',
    observacoes: 'Locução masculina',
    urgencia: 'alta'
});

// Exemplo: Deletar pedido
await API.pedidos.delete(1);
```

### Todas as funções retornam Promises

```javascript
API.pedidos.list()
    .then(response => {
        if (response.status === 'success') {
            // Sucesso
        }
    })
    .catch(error => {
        console.error(error);
    });
```

---

## 📡 Endpoints Disponíveis

### 🔐 Autenticação

```javascript
// Login
await API.auth.login('email@exemplo.com', 'senha123');

// Logout
await API.auth.logout();

// Verificar sessão
await API.auth.checkSession();
```

### 📝 Pedidos

```javascript
// Listar todos
await API.pedidos.list();

// Listar com filtros
await API.pedidos.list({ status: 'pendente', limit: 10 });

// Buscar por ID
await API.pedidos.read(1);

// Criar
await API.pedidos.create({
    tipo: 'anuncio',
    texto: 'Texto do pedido',
    observacoes: 'Observações',
    urgencia: 'media'
});

// Atualizar
await API.pedidos.update(1, {
    texto: 'Novo texto',
    urgencia: 'alta'
});

// Deletar
await API.pedidos.delete(1);
```

### 🎤 Locuções

```javascript
// Listar
await API.locucoes.list();

// Criar
await API.locucoes.create({
    nome: 'Nome da Locução',
    arquivo_url: '/audio/locucao.mp3',
    duracao: 30
});

// Bloquear/Desbloquear
await API.locucoes.toggleBlock(1);

// Deletar
await API.locucoes.delete(1);
```

### 👥 Funcionários

```javascript
// Listar
await API.funcionarios.list();

// Criar
await API.funcionarios.create({
    nome: 'João Silva',
    cargo: 'Gerente'
});

// Deletar
await API.funcionarios.delete(1);
```

### 💡 Sugestões

```javascript
// Enviar sugestão
await API.sugestoes.create('Minha sugestão aqui', 'feature');
```

### 🚗 Veículos (Sugestões)

```javascript
// Enviar sugestão de veículo
await API.veiculos.createSugestao({
    tipo: 'novo_veiculo',
    texto: 'Sugestão de novo veículo',
    email: 'contato@email.com'
});
```

### 📤 Uploads

```javascript
// Upload de arquivo
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

await API.uploads.create(file);
```

---

## 🔄 Modo MOCK vs Produção

### Modo MOCK (MOCK_MODE = true)

**Vantagens:**
- ✅ Não precisa de banco de dados
- ✅ Setup instantâneo
- ✅ Perfeito para desenvolvimento
- ✅ Dados simulados realistas
- ✅ Testes rápidos

**Como funciona:**
- Arrays PHP com dados mockados
- Sessão fake criada automaticamente
- IDs aleatórios gerados
- Simula sucesso/erro

### Modo PRODUÇÃO (MOCK_MODE = false)

**Vantagens:**
- ✅ Dados persistem no banco
- ✅ Múltiplos usuários reais
- ✅ Transações ACID
- ✅ Escalável
- ✅ Backups e recuperação

**Requer:**
- MySQL/MariaDB instalado
- Migrations executadas
- Credenciais configuradas

---

## 🎨 Integração com Frontend

### Funções Já Integradas

O arquivo `api-integration.js` já substitui automaticamente as seguintes funções:

- ✅ `enviarPedido()` - Envia pedido para API
- ✅ `enviarSugestao()` - Envia sugestão para API
- ✅ `enviarSugestaoVeiculos()` - Envia sugestão de veículo
- ✅ `enviarUpload()` - Faz upload de arquivo

### Como Funciona

```javascript
// Antes (função original sem API)
function enviarPedido() {
    // Apenas validava e mostrava toast
    showToast('Pedido enviado!', 'success');
}

// Depois (com integração API)
async function enviarPedido() {
    const data = { /* coleta dados do form */ };
    const response = await API.pedidos.create(data);
    
    if (response.status === 'success') {
        // Fecha drawer, mostra sucesso, etc
    }
}
```

### Adicionar Nova Integração

Para integrar uma nova funcionalidade:

```javascript
// No seu arquivo JS ou em api-integration.js

async function minhaNovaFuncao() {
    // 1. Coleta dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    
    // 2. Valida
    if (!nome || !email) {
        showToast('Preencha todos os campos', 'error');
        return;
    }
    
    // 3. Chama a API
    const response = await API.suaSecao.create({
        nome,
        email
    });
    
    // 4. Trata resposta
    if (response.status === 'success') {
        // Sucesso
        showToast('Criado com sucesso!', 'success');
    } else {
        // Erro
        showToast(response.message, 'error');
    }
}
```

---

## ➕ Criar Novos Endpoints

### Passo 1: Criar Estrutura de Arquivos

```bash
api/
└── sua-secao/
    ├── list.php
    ├── create.php
    ├── read.php
    ├── update.php
    └── delete.php
```

### Passo 2: Código Base do Endpoint

Use este template para criar novos endpoints:

```php
<?php
/**
 * API - Descrição do Endpoint
 * Endpoint: METHOD /api/sua-secao/arquivo.php
 */

require_once '../config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

try {
    // Valida sessão
    $userId = validateSession();
    
    // Obtém dados do request
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Valida campos obrigatórios
    if (empty($input['campo_obrigatorio'])) {
        sendJsonResponse([
            'status' => 'error',
            'message' => 'Campo obrigatório não fornecido'
        ], 400);
    }
    
    // Sanitiza dados
    $campo = sanitizeInput($input['campo_obrigatorio']);
    
    // MODO MOCK
    if (MOCK_MODE) {
        $mockData = [
            ['id' => 1, 'campo' => 'valor']
        ];
        
        sendJsonResponse([
            'status' => 'success',
            'data' => $mockData
        ]);
    }
    
    // MODO PRODUÇÃO
    $database = new Database();
    $db = $database->getConnection();
    
    $query = "SELECT * FROM sua_tabela WHERE user_id = :user_id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
    $stmt->execute();
    
    sendJsonResponse([
        'status' => 'success',
        'data' => $stmt->fetchAll()
    ]);
    
} catch (Exception $e) {
    error_log("Erro: " . $e->getMessage());
    sendJsonResponse([
        'status' => 'error',
        'message' => 'Erro ao processar requisição'
    ], 500);
}
```

### Passo 3: Adicionar ao api-integration.js

```javascript
// Adicione no objeto API:

API.suaSecao = {
    async list() {
        return await apiFetch('/sua-secao/list.php');
    },
    
    async create(data) {
        const response = await apiFetch('/sua-secao/create.php', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        
        showApiMessage(response);
        return response;
    },
    
    async delete(id) {
        const response = await apiFetch('/sua-secao/delete.php', {
            method: 'DELETE',
            body: JSON.stringify({ id })
        });
        
        showApiMessage(response);
        return response;
    }
};
```

### Passo 4: Adicionar Tabela no Banco (se necessário)

Edite `api/config/migrations.sql`:

```sql
CREATE TABLE IF NOT EXISTS sua_tabela (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    campo VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 🎭 Adicionar Modals/Drawers

### Estrutura HTML de um Modal

```html
<!-- Modal Exemplo -->
<div id="modalExemplo" class="modal-closable-esc hidden fixed inset-0 z-50 items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
        <h2 class="text-xl font-semibold mb-4">Título do Modal</h2>
        
        <!-- Conteúdo -->
        <div class="space-y-4">
            <input type="text" id="exemploInput" class="w-full px-4 py-2 border rounded-lg" placeholder="Digite aqui">
        </div>
        
        <!-- Botões -->
        <div class="flex gap-3 mt-6">
            <button onclick="closeExemploModal()" class="flex-1 px-4 py-2 border rounded-lg">
                Cancelar
            </button>
            <button onclick="submitExemplo()" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg">
                Confirmar
            </button>
        </div>
    </div>
</div>
```

### JavaScript do Modal

```javascript
// scripts/modals-functions.js

function openExemploModal() {
    const modal = document.getElementById('modalExemplo');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeExemploModal() {
    const modal = document.getElementById('modalExemplo');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

async function submitExemplo() {
    const input = document.getElementById('exemploInput');
    const valor = input.value.trim();
    
    if (!valor) {
        showToast('Preencha o campo', 'error');
        return;
    }
    
    // Chama API
    const response = await API.suaSecao.create({ campo: valor });
    
    if (response.status === 'success') {
        closeExemploModal();
        input.value = ''; // Limpa
        
        // Mostra sucesso
        setTimeout(() => {
            showSucessoModal('Sucesso!', 'Operação realizada com sucesso!');
        }, 300);
    }
}

// Expõe funções globalmente
window.openExemploModal = openExemploModal;
window.closeExemploModal = closeExemploModal;
window.submitExemplo = submitExemplo;
```

### Estrutura de um Drawer

```html
<!-- Drawer Exemplo -->
<div id="drawerExemplo" class="drawer fixed top-0 right-0 h-full w-96 bg-white dark:bg-gray-900 shadow-2xl transform translate-x-full transition-transform duration-300 z-40 overflow-y-auto">
    <div class="p-6">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold">Título do Drawer</h2>
            <button onclick="closeDrawer('exemplo')" class="p-2 hover:bg-gray-200 rounded-lg">
                ✕
            </button>
        </div>
        
        <!-- Conteúdo -->
        <div class="space-y-4">
            <!-- Seu conteúdo aqui -->
        </div>
        
        <!-- Botão Submit -->
        <button onclick="submitDrawerExemplo()" class="w-full mt-6 px-4 py-3 bg-blue-600 text-white rounded-lg">
            Enviar
        </button>
    </div>
</div>
```

**Importante:** Os drawers usam as funções `openDrawer(name)` e `closeDrawer(name)` que já existem em `scripts/drawers.js`.

---

## 🔒 Segurança

### Validação de Entrada

**Sempre sanitize dados:**

```php
// PHP
$nome = sanitizeInput($input['nome']);
$email = sanitizeInput($input['email'], 'email');
$idade = sanitizeInput($input['idade'], 'int');
```

### Proteção SQL Injection

**Use PDO com prepared statements:**

```php
// ✅ CORRETO
$stmt = $db->prepare("SELECT * FROM users WHERE id = :id");
$stmt->bindParam(':id', $userId, PDO::PARAM_INT);
$stmt->execute();

// ❌ ERRADO (vulnerável)
$query = "SELECT * FROM users WHERE id = $userId";
```

### Proteção XSS

**htmlspecialchars já está em sanitizeInput:**

```php
$texto = sanitizeInput($input['texto']); // Já protege contra XSS
```

### Validação de Sessão

**Todos os endpoints protegidos chamam:**

```php
$userId = validateSession(); // Retorna ID ou termina com erro 401
```

### CORS

**Configure conforme necessário:**

```php
// Permitir apenas seu domínio em produção
header('Access-Control-Allow-Origin: https://seudominio.com');
```

---

## 🐛 Troubleshooting

### Erro: "Usuário não autenticado"

**Causa:** Sessão não iniciada ou expirada

**Solução:**
1. Verifique se `session_start()` está sendo chamado
2. Em modo MOCK, a sessão é criada automaticamente
3. Em modo PRODUÇÃO, faça login via `API.auth.login()`

### Erro: "Erro de conexão com banco"

**Causa:** Credenciais incorretas ou banco não existe

**Solução:**
1. Verifique `api/config/database.php`
2. Confirme que o banco existe
3. Execute as migrations: `mysql -u user -p db < migrations.sql`

### Erro: CORS blocked

**Causa:** Navegador bloqueando requisições cross-origin

**Solução:**
1. Configure CORS no PHP (já está configurado)
2. Use servidor local (XAMPP, WAMP, etc)
3. Ou desabilite CORS no navegador (apenas desenvolvimento)

### API não responde

**Debug:**

```javascript
// Ative debug mode
const API_DEBUG = true; // em api-integration.js

// Verifique console do navegador
// Verifique logs do PHP (error_log)
```

### Upload não funciona

**Verificações:**
1. Permissões da pasta `uploads/` (755 ou 777)
2. Limite de upload no `php.ini`:
   ```ini
   upload_max_filesize = 10M
   post_max_size = 10M
   ```
3. Tipo de arquivo permitido no código

---

## 📚 Referências Rápidas

### Tipos de Resposta da API

```javascript
// Sucesso
{
    status: 'success',
    message: 'Mensagem de sucesso',
    data: { /* dados */ }
}

// Erro
{
    status: 'error',
    message: 'Mensagem de erro'
}
```

### Códigos HTTP Usados

- `200` - OK (sucesso geral)
- `201` - Created (recurso criado)
- `400` - Bad Request (erro de validação)
- `401` - Unauthorized (não autenticado)
- `404` - Not Found (recurso não encontrado)
- `405` - Method Not Allowed (método HTTP errado)
- `500` - Internal Server Error (erro no servidor)

### Funções Auxiliares Disponíveis

```php
// PHP (em database.php)
sanitizeInput($data, $type)
validateSession()
sendJsonResponse($data, $statusCode)

// JavaScript (em api-integration.js)
apiFetch(endpoint, options)
showApiMessage(response)
```

---

## 📞 Suporte

Se encontrar problemas ou tiver dúvidas:

1. Verifique este README
2. Verifique os comentários no código
3. Ative o modo DEBUG e analise os logs
4. Consulte a documentação do PHP e MySQL

---

## 🎉 Pronto!

Você agora tem um sistema completo de API REST integrado com seu frontend!

**Próximos passos sugeridos:**
1. Teste todos os endpoints em modo MOCK
2. Configure o banco de dados
3. Migre para modo PRODUÇÃO
4. Implemente autenticação real
5. Adicione mais funcionalidades conforme necessário

---

**Desenvolvido com ❤️ para facilitar sua vida!**
