// Modal de Confirmação Genérico
function showConfirmModal(titulo, mensagem, onConfirm) {
    const modal = document.getElementById('modalConfirmacao');
    const tituloEl = document.getElementById('modalConfirmacaoTitulo');
    const mensagemEl = document.getElementById('modalConfirmacaoMensagem');
    const btnConfirmar = document.getElementById('modalConfirmacaoBtnConfirmar');
    
    if (modal && tituloEl && mensagemEl && btnConfirmar) {
        tituloEl.textContent = titulo;
        mensagemEl.textContent = mensagem;
        
        btnConfirmar.onclick = () => {
            if (onConfirm) onConfirm();
            closeModalConfirmacao();
        };
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeModalConfirmacao() {
    const modal = document.getElementById('modalConfirmacao');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// Modal de Sucesso
function showSucessoModal(titulo, mensagem) {
    const modal = document.getElementById('modalSucesso');
    const tituloEl = document.getElementById('modalSucessoTitulo');
    const mensagemEl = document.getElementById('modalSucessoMensagem');
    
    if (modal && tituloEl && mensagemEl) {
        tituloEl.textContent = titulo;
        mensagemEl.textContent = mensagem;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeModalSucesso() {
    const modal = document.getElementById('modalSucesso');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// Modal Compartilhar
function openShareModal() {
    const modal = document.getElementById('modalCompartilhar');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeShareModal() {
    const modal = document.getElementById('modalCompartilhar');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function copyShareLink() {
    const input = document.getElementById('shareLink');
    if (input) {
        input.select();
        document.execCommand('copy');
        showToast('Link copiado com sucesso!', 'success');
    }
}

// Modal Configurações
function openConfiguracoesModal() {
    toggleUserDropdown();
    const modal = document.getElementById('modalConfiguracoes');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeConfiguracoesModal() {
    const modal = document.getElementById('modalConfiguracoes');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function switchConfigTab(tabName) {
    document.querySelectorAll('.config-tab-btn').forEach(btn => {
        btn.classList.remove('bg-blue-100', 'dark:bg-blue-900/30', 'text-blue-700', 'dark:text-blue-300', 'font-medium');
        btn.classList.add('hover:bg-gray-200', 'dark:hover:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
    });
    
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('bg-blue-100', 'dark:bg-blue-900/30', 'text-blue-700', 'dark:text-blue-300', 'font-medium');
        activeBtn.classList.remove('hover:bg-gray-200', 'dark:hover:bg-gray-800');
    }
    
    document.querySelectorAll('.config-tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    const activeContent = document.getElementById(`configTab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
    if (activeContent) {
        activeContent.classList.remove('hidden');
    }
}

function setTheme(theme) {
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    
    if (theme === 'dark') {
        html.classList.add('dark');
        isDarkMode = true;
    } else {
        html.classList.remove('dark');
        isDarkMode = false;
    }
    
    showToast('Tema alterado com sucesso', 'success');
}

// Accordion Helper
function toggleAccordion(id) {
    const content = document.getElementById(id);
    const chevron = document.getElementById(`chevron-${id}`);
    
    if (content && chevron) {
        content.classList.toggle('hidden');
        chevron.classList.toggle('rotate-180');
    }
}

// Modal Funcionários
function openGerenciarFuncionariosModal() {
    const modal = document.getElementById('modalGerenciarFuncionarios');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeGerenciarFuncionariosModal() {
    const modal = document.getElementById('modalGerenciarFuncionarios');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function switchFuncionarioTab(tabName) {
    document.querySelectorAll('.func-tab-btn').forEach(btn => {
        btn.classList.remove('border-blue-600', 'text-blue-600');
        btn.classList.add('border-transparent', 'text-gray-600', 'dark:text-gray-400');
    });
    
    const activeBtn = document.querySelector(`.func-tab-btn[data-tab="${tabName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('border-blue-600', 'text-blue-600');
        activeBtn.classList.remove('border-transparent', 'text-gray-600', 'dark:text-gray-400');
    }
    
    document.querySelectorAll('.func-tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    const activeContent = document.getElementById(`funcTab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
    if (activeContent) {
        activeContent.classList.remove('hidden');
    }
}

// Gerenciar Nomes de Funcionários
async function adicionarNomeFuncionario() {
    const input = document.getElementById('inputNovoNome');
    const nome = input.value.trim();
    
    if (!nome) {
        showToast('Por favor, digite um nome', 'error');
        return;
    }
    
    try {
        // Integração com API
        const response = await API.funcionarios.create({ nome, tipo: 'nome' });
        
        const lista = document.getElementById('listaNomesFuncionarios');
        const novoItem = document.createElement('div');
        novoItem.className = 'flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg';
        novoItem.dataset.id = response.data.id;
        novoItem.innerHTML = `
            <span class="font-medium text-gray-800 dark:text-gray-200">${nome}</span>
            <button onclick="removerNomeFuncionario(this)" class="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
            </button>
        `;
        
        lista.appendChild(novoItem);
        input.value = '';
        showToast('Nome adicionado com sucesso', 'success');
    } catch (error) {
        showToast('Erro ao adicionar nome', 'error');
        console.error(error);
    }
}

async function removerNomeFuncionario(btn) {
    const item = btn.closest('div.flex');
    if (!item) return;
    
    const id = item.dataset.id;
    
    try {
        await API.funcionarios.delete(id);
        item.remove();
        showToast('Nome removido', 'success');
    } catch (error) {
        showToast('Erro ao remover nome', 'error');
        console.error(error);
    }
}

// Gerenciar Chamadas de Funcionários
async function adicionarChamadaFuncionario() {
    const input = document.getElementById('inputNovaChamada');
    const chamada = input.value.trim();
    
    if (!chamada) {
        showToast('Por favor, digite uma chamada', 'error');
        return;
    }
    
    try {
        // Integração com API
        const response = await API.funcionarios.create({ nome: chamada, tipo: 'chamada' });
        
        const lista = document.getElementById('listaChamadasFuncionarios');
        const novoItem = document.createElement('div');
        novoItem.className = 'flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg';
        novoItem.dataset.id = response.data.id;
        novoItem.innerHTML = `
            <span class="font-medium text-gray-800 dark:text-gray-200">${chamada}</span>
            <div class="flex gap-2">
                <button onclick="playPreviewChamada(this)" class="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </button>
                <button onclick="removerChamadaFuncionario(this)" class="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                </button>
            </div>
        `;
        
        lista.appendChild(novoItem);
        input.value = '';
        showToast('Chamada adicionada com sucesso', 'success');
    } catch (error) {
        showToast('Erro ao adicionar chamada', 'error');
        console.error(error);
    }
}

async function removerChamadaFuncionario(btn) {
    const item = btn.closest('div.flex');
    if (!item) return;
    
    const id = item.dataset.id;
    
    try {
        await API.funcionarios.delete(id);
        item.remove();
        showToast('Chamada removida', 'success');
    } catch (error) {
        showToast('Erro ao remover chamada', 'error');
        console.error(error);
    }
}

function playPreviewChamada(btn) {
    const item = btn.closest('div.flex');
    const texto = item.querySelector('span').textContent;
    showToast(`Reproduzindo: "${texto}"`, 'info');
}

// Modal Pasta Locuções
function openPastaLocucoesModal() {
    const modal = document.getElementById('modalPastaLocucoes');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closePastaLocucoesModal() {
    const modal = document.getElementById('modalPastaLocucoes');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function ouvirLocucao(id) {
    showToast('Reproduzindo locução...', 'info');
}

async function bloquearLocucao(id) {
    try {
        const response = await API.locucoes.toggleBlock(id);
        if (response.status === 'success') {
            showToast('Locução bloqueada/desbloqueada', 'success');
        } else {
            showToast(response.message || 'Erro ao bloquear locução', 'error');
        }
    } catch (error) {
        console.error('Erro ao bloquear locução:', error);
        showToast('Erro ao bloquear locução', 'error');
    }
}

async function excluirLocucao(id) {
    showConfirmModal('Excluir Locução', 'Deseja realmente excluir esta locução?', async () => {
        try {
            const response = await API.locucoes.delete(id);
            if (response.status === 'success') {
                showToast('Locução excluída com sucesso', 'success');
                // Reload list if needed
            } else {
                showToast(response.message || 'Erro ao excluir locução', 'error');
            }
        } catch (error) {
            console.error('Erro ao excluir locução:', error);
            showToast('Erro ao excluir locução', 'error');
        }
    });
}

// Sugestão de Veículos Modal
function openSugestaoVeiculosModal() {
    const modal = document.getElementById('modalSugestaoVeiculos');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeSugestaoVeiculosModal() {
    const modal = document.getElementById('modalSugestaoVeiculos');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        // Reset form
        document.getElementById('sugestaoVeiculosTipo').value = '';
        document.getElementById('sugestaoVeiculosTexto').value = '';
        document.getElementById('sugestaoVeiculosEmail').value = '';
    }
}

async function enviarSugestaoVeiculos() {
    const tipo = document.getElementById('sugestaoVeiculosTipo').value;
    const texto = document.getElementById('sugestaoVeiculosTexto').value.trim();
    const email = document.getElementById('sugestaoVeiculosEmail').value.trim();
    
    if (!tipo) {
        showToast('Por favor, selecione o tipo de sugestão.', 'error');
        return;
    }
    
    if (!texto) {
        showToast('Por favor, descreva sua sugestão.', 'error');
        return;
    }
    
    try {
        showToast('Enviando sugestão...', 'info');
        
        const sugestaoData = {
            tipo: tipo,
            texto: texto,
            email: email || null
        };
        
        const response = await API.veiculos.createSugestao(sugestaoData);
        
        if (response.status === 'success') {
            closeSugestaoVeiculosModal();
            setTimeout(() => {
                showSucessoModal('Sugestão Enviada!', 'Sua sugestão foi enviada com sucesso! Agradecemos seu feedback.');
            }, 300);
        } else {
            showToast(response.message || 'Erro ao enviar sugestão', 'error');
        }
    } catch (error) {
        console.error('Erro ao enviar sugestão:', error);
        showToast('Erro ao enviar sugestão. Tente novamente.', 'error');
    }
}

// Handle Sugestões Drawer Submit
function enviarSugestao() {
    const textarea = document.querySelector('#drawerSugestoes textarea');
    if (textarea && textarea.value.trim()) {
        showToast('Enviando sugestão...', 'info');
        
        setTimeout(() => {
            closeDrawer('sugestoes');
            setTimeout(() => {
                showSucessoModal('Sugestão Enviada!', 'Sua sugestão foi enviada com sucesso! Agradecemos seu feedback.');
            }, 300);
        }, 1000);
    } else {
        showToast('Por favor, escreva sua sugestão.', 'error');
    }
}

// Handle Upload Drawer Submit  
function enviarUpload() {
    const fileInput = document.querySelector('#drawerUpload input[type="file"]');
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
        showToast('Enviando arquivo...', 'info');
        
        setTimeout(() => {
            closeDrawer('upload');
            setTimeout(() => {
                showSucessoModal('Upload Concluído!', 'Seu anúncio foi enviado com sucesso e será processado em breve.');
            }, 300);
        }, 1500);
    } else {
        showToast('Por favor, selecione um arquivo para enviar.', 'error');
    }
}

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 300);
        }, 800);
    }
});

// ESC para fechar modais
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-closable-esc.flex').forEach(modal => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        });
    }
});

// Expose functions
window.showConfirmModal = showConfirmModal;
window.closeModalConfirmacao = closeModalConfirmacao;
window.showSucessoModal = showSucessoModal;
window.closeModalSucesso = closeModalSucesso;
window.openShareModal = openShareModal;
window.closeShareModal = closeShareModal;
window.copyShareLink = copyShareLink;
window.openConfiguracoesModal = openConfiguracoesModal;
window.closeConfiguracoesModal = closeConfiguracoesModal;
window.switchConfigTab = switchConfigTab;
window.setTheme = setTheme;
window.toggleAccordion = toggleAccordion;
window.openGerenciarFuncionariosModal = openGerenciarFuncionariosModal;
window.closeGerenciarFuncionariosModal = closeGerenciarFuncionariosModal;
window.switchFuncionarioTab = switchFuncionarioTab;
window.openPastaLocucoesModal = openPastaLocucoesModal;
window.closePastaLocucoesModal = closePastaLocucoesModal;
window.ouvirLocucao = ouvirLocucao;
window.bloquearLocucao = bloquearLocucao;
window.excluirLocucao = excluirLocucao;
window.openSugestaoVeiculosModal = openSugestaoVeiculosModal;
window.closeSugestaoVeiculosModal = closeSugestaoVeiculosModal;
window.enviarSugestaoVeiculos = enviarSugestaoVeiculos;
window.enviarSugestao = enviarSugestao;
window.enviarUpload = enviarUpload;
window.adicionarNomeFuncionario = adicionarNomeFuncionario;
window.removerNomeFuncionario = removerNomeFuncionario;
window.adicionarChamadaFuncionario = adicionarChamadaFuncionario;
window.removerChamadaFuncionario = removerChamadaFuncionario;
window.playPreviewChamada = playPreviewChamada;

// Alias para compatibilidade
window.openModalFuncionarios = openGerenciarFuncionariosModal;

// Função auxiliar do drawer funcionários
window.playFuncionarios = function() {
    showToast('Reproduzindo chamada de funcionário...', 'info');
};
