/**
 * ============================================
 * API INTEGRATION - Stream Player Alpha 01
 * ============================================
 * 
 * Sistema de integração com API REST PHP
 * Gerencia todas as requisições AJAX/Fetch
 * 
 * COMO USAR:
 * 
 * 1. Import this file in your HTML:
 *    <script src="scripts/api-integration.js"></script>
 * 
 * 2. Configure API_BASE_URL (linha 20)
 * 
 * 3. Use as funções disponíveis:
 *    - API.pedidos.list()
 *    - API.pedidos.create(data)
 *    - API.locucoes.list()
 *    - etc.
 */

// ============================================
// CONFIGURAÇÃO
// ============================================

// URL base da API (ajuste conforme seu ambiente)
const API_BASE_URL = 'http://localhost/stream-player/api';

// Flag para debug (mostra logs no console)
const API_DEBUG = true;

// ============================================
// UTILITÁRIOS
// ============================================

/**
 * Função auxiliar para fazer requisições fetch
 */
async function apiFetch(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Envia cookies de sessão
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    if (API_DEBUG) {
        console.log(`[API] ${finalOptions.method || 'GET'} ${url}`, finalOptions.body ? JSON.parse(finalOptions.body) : '');
    }
    
    try {
        const response = await fetch(url, finalOptions);
        const data = await response.json();
        
        if (API_DEBUG) {
            console.log(`[API Response] ${url}`, data);
        }
        
        return data;
    } catch (error) {
        console.error('[API Error]', error);
        return {
            status: 'error',
            message: 'Erro de conexão com o servidor'
        };
    }
}

/**
 * Mostra mensagem de sucesso/erro usando o toast do sistema
 */
function showApiMessage(response) {
    if (typeof showToast !== 'undefined') {
        const type = response.status === 'success' ? 'success' : 'error';
        showToast(response.message, type);
    } else {
        alert(response.message);
    }
}

// ============================================
// API OBJECT - Todos os endpoints organizados
// ============================================

const API = {
    
    // ========== AUTENTICAÇÃO ==========
    auth: {
        /**
         * Faz login do usuário
         * @param {string} email 
         * @param {string} password 
         */
        async login(email, password) {
            const response = await apiFetch('/auth/login.php', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            
            if (response.status === 'success') {
                // Armazena dados do usuário
                sessionStorage.setItem('user', JSON.stringify(response.data));
            }
            
            return response;
        },
        
        /**
         * Faz logout do usuário
         */
        async logout() {
            const response = await apiFetch('/auth/logout.php', {
                method: 'POST'
            });
            
            if (response.status === 'success') {
                sessionStorage.removeItem('user');
                // Redireciona para página de login
                window.location.href = 'auth.html';
            }
            
            return response;
        },
        
        /**
         * Verifica se usuário está autenticado
         */
        async checkSession() {
            return await apiFetch('/auth/session.php');
        }
    },
    
    // ========== PEDIDOS ==========
    pedidos: {
        /**
         * Lista todos os pedidos do usuário
         * @param {object} params - { status: 'pendente', limit: 50, offset: 0 }
         */
        async list(params = {}) {
            const queryString = new URLSearchParams(params).toString();
            return await apiFetch(`/pedidos/list.php?${queryString}`);
        },
        
        /**
         * Cria novo pedido
         * @param {object} data - { tipo, texto, observacoes, urgencia }
         */
        async create(data) {
            const response = await apiFetch('/pedidos/create.php', {
                method: 'POST',
                body: JSON.stringify(data)
            });
            
            showApiMessage(response);
            return response;
        },
        
        /**
         * Busca pedido por ID
         * @param {number} id 
         */
        async read(id) {
            return await apiFetch(`/pedidos/read.php?id=${id}`);
        },
        
        /**
         * Atualiza pedido
         * @param {number} id 
         * @param {object} data 
         */
        async update(id, data) {
            const response = await apiFetch('/pedidos/update.php', {
                method: 'PUT',
                body: JSON.stringify({ id, ...data })
            });
            
            showApiMessage(response);
            return response;
        },
        
        /**
         * Deleta pedido
         * @param {number} id 
         */
        async delete(id) {
            const response = await apiFetch('/pedidos/delete.php', {
                method: 'DELETE',
                body: JSON.stringify({ id })
            });
            
            showApiMessage(response);
            return response;
        }
    },
    
    // ========== LOCUÇÕES ==========
    locucoes: {
        async list() {
            return await apiFetch('/locucoes/list.php');
        },
        
        async create(data) {
            const response = await apiFetch('/locucoes/create.php', {
                method: 'POST',
                body: JSON.stringify(data)
            });
            
            showApiMessage(response);
            return response;
        },
        
        async delete(id) {
            const response = await apiFetch('/locucoes/delete.php', {
                method: 'DELETE',
                body: JSON.stringify({ id })
            });
            
            showApiMessage(response);
            return response;
        },
        
        async toggleBlock(id) {
            const response = await apiFetch('/locucoes/toggle-block.php', {
                method: 'POST',
                body: JSON.stringify({ id })
            });
            
            showApiMessage(response);
            return response;
        }
    },
    
    // ========== FUNCIONÁRIOS ==========
    funcionarios: {
        async list() {
            return await apiFetch('/funcionarios/list.php');
        },
        
        async create(data) {
            const response = await apiFetch('/funcionarios/create.php', {
                method: 'POST',
                body: JSON.stringify(data)
            });
            
            showApiMessage(response);
            return response;
        },
        
        async delete(id) {
            const response = await apiFetch('/funcionarios/delete.php', {
                method: 'DELETE',
                body: JSON.stringify({ id })
            });
            
            showApiMessage(response);
            return response;
        }
    },
    
    // ========== SUGESTÕES ==========
    sugestoes: {
        async create(texto, tipo = 'outro') {
            const response = await apiFetch('/sugestoes/create.php', {
                method: 'POST',
                body: JSON.stringify({ texto, tipo })
            });
            
            showApiMessage(response);
            return response;
        }
    },
    
    // ========== VEÍCULOS (SUGESTÕES) ==========
    veiculos: {
        async createSugestao(data) {
            const response = await apiFetch('/veiculos/create-sugestao.php', {
                method: 'POST',
                body: JSON.stringify(data)
            });
            
            showApiMessage(response);
            return response;
        }
    },
    
    // ========== UPLOADS ==========
    uploads: {
        /**
         * Faz upload de arquivo
         * @param {File} file - Arquivo do input type="file"
         */
        async create(file) {
            const formData = new FormData();
            formData.append('arquivo', file);
            
            const url = `${API_BASE_URL}/uploads/create.php`;
            
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                });
                
                const data = await response.json();
                showApiMessage(data);
                return data;
            } catch (error) {
                console.error('[Upload Error]', error);
                return {
                    status: 'error',
                    message: 'Erro ao fazer upload'
                };
            }
        }
    }
};

// ============================================
// INTEGRAÇÃO COM FUNÇÕES EXISTENTES
// ============================================

/**
 * Substitui a função original enviarPedido para usar a API
 */
if (typeof window.enviarPedido !== 'undefined') {
    const originalEnviarPedido = window.enviarPedido;
    
    window.enviarPedido = async function() {
        const tipoSelect = document.getElementById('tipoPedido');
        const textoTextarea = document.getElementById('textoPedido');
        const obsTextarea = document.getElementById('observacoesPedido');
        const urgenciaSelect = document.getElementById('urgenciaPedido');
        
        if (!tipoSelect || !textoTextarea) {
            console.error('Elementos do formulário não encontrados');
            return;
        }
        
        const tipo = tipoSelect.value;
        const texto = textoTextarea.value.trim();
        const observacoes = obsTextarea ? obsTextarea.value.trim() : '';
        const urgencia = urgenciaSelect ? urgenciaSelect.value : 'media';
        
        if (!tipo || !texto) {
            showToast('Preencha todos os campos obrigatórios', 'error');
            return;
        }
        
        // Envia para API
        const response = await API.pedidos.create({
            tipo,
            texto,
            observacoes,
            urgencia
        });
        
        if (response.status === 'success') {
            // Limpa formulário
            textoTextarea.value = '';
            if (obsTextarea) obsTextarea.value = '';
            
            // Fecha drawer
            if (typeof closeDrawer !== 'undefined') {
                closeDrawer('pedidos');
            }
            
            // Mostra modal de sucesso
            setTimeout(() => {
                if (typeof showSucessoModal !== 'undefined') {
                    showSucessoModal('Pedido Enviado!', 'Seu pedido de gravação foi enviado com sucesso!');
                }
            }, 300);
        }
    };
}

/**
 * Substitui função de enviar sugestão
 */
if (typeof window.enviarSugestao !== 'undefined') {
    window.enviarSugestao = async function() {
        const textarea = document.querySelector('#drawerSugestoes textarea');
        
        if (!textarea || !textarea.value.trim()) {
            showToast('Por favor, escreva sua sugestão.', 'error');
            return;
        }
        
        const response = await API.sugestoes.create(textarea.value.trim());
        
        if (response.status === 'success') {
            textarea.value = '';
            
            if (typeof closeDrawer !== 'undefined') {
                closeDrawer('sugestoes');
            }
            
            setTimeout(() => {
                if (typeof showSucessoModal !== 'undefined') {
                    showSucessoModal('Sugestão Enviada!', 'Sua sugestão foi enviada com sucesso!');
                }
            }, 300);
        }
    };
}

/**
 * Substitui função de enviar sugestão de veículos
 */
if (typeof window.enviarSugestaoVeiculos !== 'undefined') {
    window.enviarSugestaoVeiculos = async function() {
        const tipo = document.getElementById('sugestaoVeiculosTipo')?.value;
        const texto = document.getElementById('sugestaoVeiculosTexto')?.value.trim();
        const email = document.getElementById('sugestaoVeiculosEmail')?.value.trim();
        
        if (!tipo || !texto) {
            showToast('Preencha todos os campos obrigatórios', 'error');
            return;
        }
        
        const response = await API.veiculos.createSugestao({ tipo, texto, email });
        
        if (response.status === 'success') {
            if (typeof closeSugestaoVeiculosModal !== 'undefined') {
                closeSugestaoVeiculosModal();
            }
            
            setTimeout(() => {
                if (typeof showSucessoModal !== 'undefined') {
                    showSucessoModal('Sugestão Enviada!', 'Sua sugestão foi enviada com sucesso!');
                }
            }, 300);
        }
    };
}

/**
 * Substitui função de upload
 */
if (typeof window.enviarUpload !== 'undefined') {
    window.enviarUpload = async function() {
        const fileInput = document.querySelector('#drawerUpload input[type="file"]');
        
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            showToast('Por favor, selecione um arquivo.', 'error');
            return;
        }
        
        const file = fileInput.files[0];
        const response = await API.uploads.create(file);
        
        if (response.status === 'success') {
            fileInput.value = '';
            
            if (typeof closeDrawer !== 'undefined') {
                closeDrawer('upload');
            }
            
            setTimeout(() => {
                if (typeof showSucessoModal !== 'undefined') {
                    showSucessoModal('Upload Concluído!', 'Seu arquivo foi enviado com sucesso!');
                }
            }, 300);
        }
    };
}

// ============================================
// VERIFICAÇÃO DE SESSÃO AO CARREGAR PÁGINA
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
    // Verifica se está na página de autenticação
    if (window.location.pathname.includes('auth.html')) {
        return; // Não verifica sessão na página de login
    }
    
    // Verifica sessão
    const sessionResponse = await API.auth.checkSession();
    
    if (!sessionResponse.data || !sessionResponse.data.authenticated) {
        // Não autenticado, redireciona para login
        console.log('[API] Usuário não autenticado, redirecionando...');
        // window.location.href = 'auth.html'; // Descomente para ativar redirecionamento
    } else {
        console.log('[API] Usuário autenticado:', sessionResponse.data.user);
    }
});

// Exporta API para uso global
window.API = API;

console.log('[API Integration] Loaded successfully! Use window.API to access endpoints.');
