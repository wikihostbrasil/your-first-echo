# 📖 Developer Guide - Player System

Guia completo para desenvolvedores sobre como modificar, implementar e manter modais, drawers e outros componentes do sistema.

---

## 📁 Estrutura de Arquivos

```
mock-player-2/
├── index.html                    # Página principal
├── auth.html                     # Página de autenticação
├── conta-indisponivel.html       # Página de conta indisponível
├── drawer-ajuda.html             # Drawer de ajuda (carregado dinamicamente)
├── drawer-funcionarios-modal.html # Modal de gerenciar funcionários (carregado dinamicamente)
├── index-modals.html             # Modais principais (carregado dinamicamente)
├── modal-pasta-locucoes.html     # Modal de locuções (carregado dinamicamente)
├── modal-sugestao-veiculos.html  # Modal de sugestão de veículos (carregado dinamicamente)
├── scripts/
│   ├── config.js                 # Configurações globais
│   ├── toast.js                  # Sistema de notificações
│   ├── custom-select.js          # Select customizado
│   ├── player.js                 # Controles do player
│   ├── drawers.js                # Lógica dos drawers
│   ├── modals.js                 # Lógica dos modais principais
│   ├── modals-functions.js       # Funções auxiliares dos modais
│   ├── pedidos.js                # Sistema de pedidos
│   ├── sidebar-collapse.js       # Collapse da sidebar
│   └── estilos-musicais.js       # Estilos musicais
└── styles/
    ├── base.css                  # Estilos base
    ├── components.css            # Componentes
    ├── animations.css            # Animações
    └── scrollbar.css             # Scrollbar customizada
```

---

## 🎯 Como Implementar um Novo Modal

### 1. Criar o Arquivo HTML do Modal

Crie um novo arquivo HTML (ex: `modal-exemplo.html`) com a seguinte estrutura:

```html
<!-- Modal Exemplo -->
<div id="modalExemplo" class="hidden fixed inset-0 bg-black/50 z-[70] items-center justify-center p-4 modal-backdrop modal-closable-esc">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col modal-content">
        <!-- Header -->
        <div class="bg-blue-600 dark:bg-blue-700 p-6 flex-shrink-0">
            <div class="flex items-center justify-between">
                <h3 class="text-2xl font-bold text-white">Título do Modal</h3>
                <button onclick="closeExemploModal()" class="text-white hover:bg-white/20 rounded-full p-2 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
        
        <!-- Content -->
        <div class="p-6 overflow-y-auto flex-1">
            <!-- Seu conteúdo aqui -->
        </div>
        
        <!-- Footer (opcional) -->
        <div class="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3 flex-shrink-0">
            <button onclick="closeExemploModal()" class="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                Cancelar
            </button>
            <button onclick="submitExemplo()" class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Confirmar
            </button>
        </div>
    </div>
</div>
```

**⚠️ Classes Importantes:**
- `modal-backdrop`: Overlay do modal
- `modal-closable-esc`: Permite fechar com ESC
- `modal-content`: Container principal do modal
- `z-[70]`: Z-index para sobreposição correta

### 2. Carregar o Modal no index.html

Adicione no final do `index.html`, antes de `</body>`:

```html
<script>
    fetch('modal-exemplo.html')
      .then(response => response.text())
      .then(html => {
        const container = document.createElement('div');
        container.innerHTML = html;
        document.body.appendChild(container);
      });
</script>
```

### 3. Criar Funções JavaScript

Adicione em `scripts/modals-functions.js`:

```javascript
// Modal Exemplo
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
        // Limpar form se necessário
    }
}

function submitExemplo() {
    // Validação
    const campo = document.getElementById('campoExemplo').value.trim();
    
    if (!campo) {
        showToast('Por favor, preencha o campo', 'error');
        return;
    }
    
    // Simular envio
    showToast('Enviando...', 'info');
    
    setTimeout(() => {
        closeExemploModal();
        showToast('Operação realizada com sucesso!', 'success');
    }, 1000);
}

// Expor globalmente
window.openExemploModal = openExemploModal;
window.closeExemploModal = closeExemploModal;
window.submitExemplo = submitExemplo;
```

---

## 🗂️ Como Implementar um Novo Drawer

### 1. Adicionar HTML do Drawer no index.html

Adicione após os outros drawers (procure por `<!-- Drawers -->`):

```html
<div id="drawerExemplo" class="fixed bottom-0 left-0 right-0 z-[46] bg-white dark:bg-gray-800 shadow-2xl transform translate-y-full transition-transform duration-300 flex flex-col" style="max-height: 85vh;">
    <div class="bg-purple-600 dark:bg-purple-700 p-4 flex items-center justify-between flex-shrink-0">
        <div class="flex items-center space-x-2">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <!-- Ícone SVG -->
            </svg>
            <h3 class="text-xl font-bold text-white">TÍTULO DO DRAWER</h3>
        </div>
        <button onclick="closeDrawer('exemplo')" class="text-white hover:bg-white/20 rounded-full p-2 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
    </div>
    <div class="p-6 overflow-y-auto flex-1">
        <!-- Conteúdo do drawer -->
    </div>
</div>
```

**⚠️ Pontos Importantes:**
- ID deve seguir o padrão: `drawerNomeCapitalizado`
- Z-index: `z-[46]` para drawers
- Transform inicial: `translate-y-full` (oculto)
- Altura máxima: `max-height: 85vh`

### 2. Abrir o Drawer

Use a função existente:

```javascript
// Para abrir sem fechar sidebar
openDrawer('exemplo');

// Para fechar sidebar e abrir drawer
openDrawerAndCloseSidebar('exemplo');
```

### 3. Adicionar Botão no Card/Sidebar

No HTML onde você quer disparar o drawer:

```html
<button onclick="openDrawerAndCloseSidebar('exemplo')" class="...">
    Abrir Exemplo
</button>
```

---

## 🎨 Sistema de Notificações (Toast)

### Uso Básico

```javascript
// Sucesso
showToast('Operação realizada com sucesso!', 'success');

// Erro
showToast('Erro ao processar', 'error');

// Info
showToast('Processando...', 'info');

// Aviso
showToast('Atenção: verifique os dados', 'warning');
```

### Tipos Disponíveis
- `success`: Verde - Operações bem-sucedidas
- `error`: Vermelho - Erros
- `info`: Azul - Informações
- `warning`: Amarelo - Avisos

---

## 🎭 Modais com Tabs

### Estrutura de Tabs

```html
<!-- Navegação de Tabs -->
<div class="flex border-b border-gray-200 dark:border-gray-700">
    <button onclick="switchTab('tab1')" data-tab="tab1" class="tab-btn active">
        Tab 1
    </button>
    <button onclick="switchTab('tab2')" data-tab="tab2" class="tab-btn">
        Tab 2
    </button>
</div>

<!-- Conteúdo das Tabs -->
<div id="tab1Content" class="tab-content">
    <!-- Conteúdo da Tab 1 -->
</div>

<div id="tab2Content" class="tab-content hidden">
    <!-- Conteúdo da Tab 2 -->
</div>
```

### Função JavaScript para Tabs

```javascript
function switchTab(tabName) {
    // Remover classe active de todos os botões
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Adicionar classe active ao botão clicado
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Ocultar todos os conteúdos
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Mostrar conteúdo ativo
    const activeContent = document.getElementById(`${tabName}Content`);
    if (activeContent) {
        activeContent.classList.remove('hidden');
    }
}
```

---

## 🔒 Validação de Formulários

### Exemplo Completo

```javascript
function validateForm(data) {
    const errors = [];
    
    // Campo obrigatório
    if (!data.campo || data.campo.trim() === '') {
        errors.push('Campo obrigatório');
    }
    
    // E-mail
    if (data.email && !isValidEmail(data.email)) {
        errors.push('E-mail inválido');
    }
    
    // Telefone
    if (data.telefone && !isValidPhone(data.telefone)) {
        errors.push('Telefone inválido');
    }
    
    // Data
    if (data.data && !isValidDate(data.data)) {
        errors.push('Data inválida');
    }
    
    return errors;
}

// Validação de e-mail
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validação de telefone brasileiro
function isValidPhone(phone) {
    const regex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
    return regex.test(phone);
}

// Validação de data
function isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}
```

---

## 🐛 Debug e Troubleshooting

### Erros Comuns

**1. Drawer não fecha ao clicar dentro**
- ✅ Solução: O código já tem `stopPropagation` implementado nos drawers

**2. Modal não aparece**
- ✅ Verificar se o HTML foi carregado dinamicamente
- ✅ Verificar z-index (modais: `z-[70]`, drawers: `z-[46]`)

**3. Função não encontrada**
- ✅ Verificar se a função está exposta globalmente: `window.minhaFuncao = minhaFuncao;`

**4. Select customizado não funciona**
- ✅ Chamar `initCustomSelects()` após abrir drawer/modal

### Console Logs para Debug

```javascript
// Desenvolvimento
if (window.location.hostname === 'localhost') {
    console.log('Debug:', data);
}
```

---

## 🚀 Checklist para Novos Recursos

- [ ] HTML do componente criado
- [ ] Carregamento dinâmico configurado (se aplicável)
- [ ] Funções JavaScript implementadas
- [ ] Funções expostas globalmente (`window.minhaFuncao`)
- [ ] Validação de formulário
- [ ] Mensagens de feedback (toast)
- [ ] Tratamento de erros
- [ ] Responsividade testada
- [ ] Dark mode funcionando
- [ ] Custom selects inicializados (se necessário)

---

## 🎨 Classes Utilitárias Importantes

### Cores por Seção
- **Funcionários:** `bg-blue-600` / `bg-blue-700`
- **Veículos:** `bg-green-600` / `bg-green-700`
- **Pedidos:** `bg-purple-600` / `bg-purple-700`
- **Ajuda:** `bg-yellow-600` / `bg-yellow-700`

### Estados
- **Hover:** `hover:bg-{cor}-700`
- **Active:** `active:scale-95`
- **Focus:** `focus:ring-2 focus:ring-{cor}-500`

### Animações
- **Slide up (drawer):** `translate-y-full` → `translate-y-0`
- **Fade:** `opacity-0` → `opacity-100`
- **Scale:** `scale-95` → `scale-100`

---

## 📞 Suporte

Para dúvidas ou sugestões, consulte:
- `README.md` - Visão geral do projeto
- Arquivos de exemplo já implementados

---

**Última atualização:** 2024-01-25  
**Versão:** 2.0
