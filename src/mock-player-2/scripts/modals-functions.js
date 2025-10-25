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

function bloquearLocucao(id) {
    showToast('Locução bloqueada', 'success');
}

function excluirLocucao(id) {
    showConfirmModal('Excluir Locução', 'Deseja realmente excluir esta locução?', () => {
        showToast('Locução excluída com sucesso', 'success');
    });
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
