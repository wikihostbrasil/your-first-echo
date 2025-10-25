# 🎵 Stream Player - Mock Alpha 01

## 📋 Índice
- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API PHP](#api-php)
- [Integração Frontend](#integração-frontend)
- [Desenvolvimento](#desenvolvimento)
- [Como Adicionar Funcionalidades](#como-adicionar-funcionalidades)

---

## 🎯 Visão Geral

**Mock Alpha 01** é uma versão completa do Stream Player integrada com uma API REST em PHP. O sistema funciona em **modo MOCK** (sem banco de dados real) por padrão, facilitando testes e desenvolvimento.

### ✨ Características Principais
- ✅ API REST PHP organizada e documentada
- ✅ Modo MOCK para testes sem banco de dados
- ✅ Integração AJAX/Fetch completa
- ✅ Validação de dados cliente e servidor
- ✅ Sistema de sessões e autenticação
- ✅ Pronto para produção (basta configurar banco)

---

## 📁 Estrutura do Projeto

```
mock-player-alpha-01/
├── api/                          # API REST em PHP
│   ├── config/
│   │   ├── database.php          # Configuração do banco + helpers
│   │   └── migrations.sql        # Schema completo do banco
│   ├── auth/
│   │   ├── login.php             # Autenticação de usuário
│   │   ├── logout.php            # Encerrar sessão
│   │   └── session.php           # Verificar sessão ativa
│   ├── pedidos/                  # CRUD de pedidos
│   ├── locucoes/                 # CRUD de locuções
│   ├── funcionarios/             # CRUD de funcionários
│   ├── sugestoes/                # Criar sugestões
│   ├── veiculos/                 # Sugestões de veículos
│   └── uploads/                  # Upload de arquivos
├── scripts/
│   ├── api-integration.js        # 🔥 Integração com API
│   ├── pedidos.js                # Lógica de pedidos
│   ├── modals.js                 # Modals e formulários
│   ├── modals-functions.js       # Funções auxiliares de modals
│   ├── drawers.js                # Drawers laterais
│   ├── player.js                 # Player de áudio
│   └── ...
├── styles/                       # Estilos CSS
├── index.html                    # Página principal
├── API-README.md                 # 📚 Documentação da API
└── README.md                     # Este arquivo
```

---

## 🔌 API PHP

### 🎮 Modo MOCK vs Produção

A API possui dois modos de operação configurados em `api/config/database.php`:

```php
// Modo MOCK (padrão) - Sem banco de dados
define('MOCK_MODE', true);

// Modo PRODUÇÃO - Com banco de dados real
define('MOCK_MODE', false);
```

### 🔧 Configuração do Banco de Dados

Para usar com banco real:

1. **Edite `api/config/database.php`:**
```php
define('MOCK_MODE', false);
define('DB_HOST', 'localhost');
define('DB_NAME', 'stream_player');
define('DB_USER', 'root');
define('DB_PASS', 'sua_senha');
```

2. **Execute as migrations:**
```bash
mysql -u root -p < api/config/migrations.sql
```

3. **Pronto!** A API agora usa banco de dados real.

### 📡 Endpoints Disponíveis

#### 🔐 Autenticação
- `POST /api/auth/login.php` - Login
- `POST /api/auth/logout.php` - Logout
- `GET /api/auth/session.php` - Verificar sessão

#### 📝 Pedidos (Gravações)
- `GET /api/pedidos/list.php` - Listar pedidos
- `POST /api/pedidos/create.php` - Criar pedido
- `GET /api/pedidos/read.php?id=1` - Ler pedido específico
- `PUT /api/pedidos/update.php` - Atualizar pedido
- `DELETE /api/pedidos/delete.php` - Deletar pedido

#### 🎤 Locuções
- `GET /api/locucoes/list.php` - Listar locuções
- `POST /api/locucoes/create.php` - Criar locução
- `DELETE /api/locucoes/delete.php` - Deletar locução
- `PUT /api/locucoes/toggle-block.php` - Bloquear/desbloquear

#### 👥 Funcionários
- `GET /api/funcionarios/list.php` - Listar funcionários
- `POST /api/funcionarios/create.php` - Criar funcionário
- `DELETE /api/funcionarios/delete.php` - Deletar funcionário

#### 💡 Sugestões
- `POST /api/sugestoes/create.php` - Enviar sugestão
- `POST /api/veiculos/create-sugestao.php` - Sugestão de veículo

#### 📁 Uploads
- `POST /api/uploads/create.php` - Upload de anúncio

---

## 🌐 Integração Frontend

### 📦 api-integration.js

O arquivo `scripts/api-integration.js` centraliza todas as chamadas à API:

```javascript
// Exemplo de uso
const API = {
  pedidos: {
    list: async () => { /* ... */ },
    create: async (data) => { /* ... */ },
    delete: async (id) => { /* ... */ }
  },
  // ... outras seções
};
```

### 🔗 Como Usar no Código

#### Exemplo 1: Listar Pedidos
```javascript
async function carregarPedidos() {
  try {
    const response = await API.pedidos.list();
    
    if (response.status === 'success') {
      const pedidos = response.data;
      // Renderizar pedidos na interface
    }
  } catch (error) {
    console.error('Erro:', error);
    showToast('Erro ao carregar pedidos', 'error');
  }
}
```

#### Exemplo 2: Criar Pedido
```javascript
async function enviarPedido() {
  const pedidoData = {
    tipo: 'anuncio',
    texto: 'Texto do pedido',
    urgencia: 'alta'
  };
  
  const response = await API.pedidos.create(pedidoData);
  
  if (response.status === 'success') {
    showToast('Pedido criado!', 'success');
  }
}
```

---

## 🛠️ Desenvolvimento

### 🚀 Iniciando

1. **Clone ou use a pasta mock-player-alpha-01**

2. **Para testes locais (modo MOCK):**
   - Basta abrir `index.html` no navegador
   - Tudo funciona sem servidor PHP

3. **Para testes com API (MOCK ou PRODUÇÃO):**
   ```bash
   # Com PHP built-in server
   php -S localhost:8000
   
   # Acesse: http://localhost:8000/index.html
   ```

### 📝 Fluxo de Desenvolvimento

```
1. Desenvolva/teste em modo MOCK
2. Teste integração com API (ainda em MOCK)
3. Configure banco de dados
4. Ative modo PRODUÇÃO
5. Teste com dados reais
6. Deploy
```

---

## ➕ Como Adicionar Funcionalidades

### 🎨 Adicionar um Novo Modal

1. **Crie o HTML do modal:**
```html
<!-- novo-modal.html -->
<div id="novoModal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
  <div class="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
    <h2 class="text-xl font-bold mb-4">Novo Modal</h2>
    <!-- Conteúdo do modal -->
    <div class="flex gap-2 mt-4">
      <button onclick="closeNovoModal()" class="flex-1 px-4 py-2 bg-gray-300 rounded-lg">
        Cancelar
      </button>
      <button onclick="saveNovoModal()" class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Salvar
      </button>
    </div>
  </div>
</div>
```

2. **Adicione ao `index.html`:**
```html
<script>
  fetch('novo-modal.html')
    .then(response => response.text())
    .then(html => {
      const container = document.createElement('div');
      container.innerHTML = html;
      document.body.appendChild(container);
    });
</script>
```

3. **Crie funções em `scripts/modals.js`:**
```javascript
function openNovoModal() {
  document.getElementById('novoModal').classList.remove('hidden');
  document.getElementById('novoModal').classList.add('flex');
}

function closeNovoModal() {
  document.getElementById('novoModal').classList.remove('flex');
  document.getElementById('novoModal').classList.add('hidden');
}

async function saveNovoModal() {
  const data = { /* seus dados */ };
  
  try {
    const response = await API.seuEndpoint.create(data);
    
    if (response.status === 'success') {
      showToast('Salvo com sucesso!', 'success');
      closeNovoModal();
    }
  } catch (error) {
    showToast('Erro ao salvar', 'error');
  }
}
```

### 🎭 Adicionar um Novo Drawer

1. **Estrutura similar ao modal, mas com animação lateral:**
```html
<div id="novoDrawer" class="drawer-overlay hidden">
  <div class="drawer-content">
    <!-- Conteúdo -->
  </div>
</div>
```

2. **Use classes de animação do `styles/animations.css`**

3. **Adicione lógica em `scripts/drawers.js`**

### 🔌 Adicionar um Novo Endpoint

1. **Crie a estrutura da API:**
```
api/
└── nova-secao/
    ├── list.php
    ├── create.php
    ├── read.php
    ├── update.php
    └── delete.php
```

2. **Use o template base:**
```php
<?php
/**
 * API - Ação da Nova Seção
 * Endpoint: MÉTODO /api/nova-secao/acao.php
 */

require_once '../config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

try {
    $userId = validateSession();
    
    // MODO MOCK
    if (MOCK_MODE) {
        $mockData = [/* dados de teste */];
        sendJsonResponse(['status' => 'success', 'data' => $mockData]);
    }
    
    // MODO PRODUÇÃO
    $database = new Database();
    $db = $database->getConnection();
    
    // Sua lógica SQL aqui
    
    sendJsonResponse(['status' => 'success', 'data' => $result]);
    
} catch (Exception $e) {
    error_log("Erro: " . $e->getMessage());
    sendJsonResponse(['status' => 'error', 'message' => 'Erro ao processar'], 500);
}
```

3. **Adicione ao `api-integration.js`:**
```javascript
const API = {
  // ... outros endpoints
  novaSecao: {
    list: async () => {
      const response = await fetch('api/nova-secao/list.php');
      return await response.json();
    },
    create: async (data) => {
      const response = await fetch('api/nova-secao/create.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await response.json();
    }
  }
};
```

4. **Adicione tabela no `migrations.sql`:**
```sql
CREATE TABLE IF NOT EXISTS nova_tabela (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    campo VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 🎨 Adicionar Novos Estilos

1. **Edite `styles/components.css` para componentes**
2. **Edite `styles/animations.css` para animações**
3. **Use classes Tailwind CSS sempre que possível**

---

## 🔒 Segurança

### ✅ Implementado
- Validação de sessões PHP
- Sanitização de inputs (htmlspecialchars, strip_tags)
- PDO com prepared statements
- Headers CORS configuráveis
- Validação client-side e server-side

### 🚧 Para Produção
- [ ] Configurar HTTPS
- [ ] Rate limiting
- [ ] CSRF tokens
- [ ] Validação de file uploads no servidor
- [ ] Logs de auditoria
- [ ] Backup automático

---

## 📚 Documentação Adicional

- **API completa:** Consulte `API-README.md`
- **Database schema:** Veja `api/config/migrations.sql`
- **Configuração:** Veja `api/config/database.php`

---

## 🐛 Debugging

### Modo MOCK não funciona?
- Verifique `MOCK_MODE = true` em `api/config/database.php`
- Veja console do navegador (F12)

### API retorna 500?
- Verifique logs do PHP
- Verifique permissões de arquivos
- Teste endpoint direto no navegador

### Banco não conecta?
- Verifique credenciais em `database.php`
- Teste conexão MySQL: `mysql -u root -p`
- Execute migrations.sql

---

## 📞 Suporte

Em caso de dúvidas:
1. Consulte a documentação da API (`API-README.md`)
2. Verifique os exemplos nos arquivos JavaScript
3. Inspecione o console do navegador (F12)

---

## 🎉 Pronto para Produção!

Este projeto está preparado para:
- ✅ Desenvolvimento local
- ✅ Testes com mocks
- ✅ Integração com banco real
- ✅ Deploy em servidor PHP

**Boa sorte no desenvolvimento! 🚀**
