// Main initialization and event listeners

// User dropdown functions
function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdownContainer');
    dropdown.classList.toggle('hidden');
}

function handleUpgradePlan() {
    showToast('Upgrade do plano em desenvolvimento', 'info');
    toggleUserDropdown();
}

function handlePersonalizacao() {
    showToast('Personalização em desenvolvimento', 'info');
    toggleUserDropdown();
}

function handleConfiguracoes() {
    showToast('Configurações em desenvolvimento', 'info');
    toggleUserDropdown();
}

function handleAjuda() {
    showToast('Ajuda em desenvolvimento', 'info');
    toggleUserDropdown();
}

function handleSair() {
    if (confirm('Deseja realmente sair?')) {
        showToast('Saindo...', 'success');
        setTimeout(() => {
            window.location.href = 'auth.html';
        }, 1000);
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('userDropdownContainer');
    const avatarBtn = document.getElementById('userAvatarBtn');
    if (dropdown && avatarBtn && !dropdown.contains(e.target) && !avatarBtn.contains(e.target)) {
        dropdown.classList.add('hidden');
    }
});

// Funções para novos drawers e modals
function openAdicionarTextoModal() {
    const modal = document.getElementById('modalAdicionarTexto');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeAdicionarTextoModal() {
    const modal = document.getElementById('modalAdicionarTexto');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function salvarTextoLocucao() {
    const titulo = document.getElementById('tituloLocucao')?.value;
    const texto = document.getElementById('textoLocucao')?.value;
    const voz = document.getElementById('vozLocucao')?.value;
    
    if (!titulo || !texto) {
        showToast('Preencha todos os campos obrigatórios', 'error');
        return;
    }
    
    showToast('Locução gerada com sucesso!', 'success');
    closeAdicionarTextoModal();
}

function openAdicionarLinkModal() {
    const modal = document.getElementById('modalAdicionarLink');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeAdicionarLinkModal() {
    const modal = document.getElementById('modalAdicionarLink');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function salvarNovoLink() {
    const titulo = document.getElementById('tituloLink')?.value;
    const url = document.getElementById('urlLink')?.value;
    const descricao = document.getElementById('descricaoLink')?.value;
    
    if (!titulo || !url) {
        showToast('Preencha o título e URL do link', 'error');
        return;
    }
    
    showToast('Link adicionado com sucesso!', 'success');
    closeAdicionarLinkModal();
}

function playLocucao() {
    showToast('Reproduzindo locução...', 'info');
}

function editLink(id) {
    showToast('Editar Link ' + id + ' em desenvolvimento', 'info');
}

function deleteLink(id) {
    if (confirm('Deseja realmente excluir este link?')) {
        showToast('Link excluído com sucesso', 'success');
    }
}

function openIncorporarLinkModal() {
    showToast('Modal Incorporar Link em desenvolvimento', 'info');
}

function openNovoLinkModal() {
    openAdicionarLinkModal();
}

function reiniciarLinks() {
    showToast('Reiniciando links...', 'info');
}

function atualizarLinks() {
    showToast('Atualizando links...', 'success');
}

function alterarLogoRadio() {
    showToast('Alterar Logo em desenvolvimento', 'info');
}

function reiniciarTransmissao() {
    if (confirm('Deseja realmente reiniciar a transmissão?')) {
        showToast('Reiniciando transmissão...', 'info');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize custom selects
    initCustomSelects();
    
    // Set up player buttons
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseBtnMobile = document.getElementById('playPauseBtnMobile');
    const likeBtn = document.getElementById('likeBtn');
    const likeBtnMobile = document.getElementById('likeBtnMobile');
    const volumeSlider = document.getElementById('volumeSlider');
    
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlay);
    }
    if (playPauseBtnMobile) {
        playPauseBtnMobile.addEventListener('click', togglePlay);
    }
    if (likeBtn) {
        likeBtn.addEventListener('click', () => toggleLike(likeBtn));
    }
    if (likeBtnMobile) {
        likeBtnMobile.addEventListener('click', () => toggleLike(likeBtnMobile));
    }
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            volume = e.target.value;
        });
    }
    
    // Progress simulation
    const progressFill = document.getElementById('progressFill');
    const progressFillMobile = document.getElementById('progressFillMobile');
    
    setInterval(() => {
        if (isPlaying) {
            progress += 1;
            if (progress >= 100) {
                progress = 0;
            }
            if (progressFill) progressFill.style.width = progress + '%';
            if (progressFillMobile) progressFillMobile.style.width = progress + '%';
        }
    }, 1000);
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const htmlElement = document.documentElement;
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            
            if (isDarkMode) {
                htmlElement.classList.add('dark');
                sunIcon?.classList.add('hidden');
                moonIcon?.classList.remove('hidden');
            } else {
                htmlElement.classList.remove('dark');
                sunIcon?.classList.remove('hidden');
                moonIcon?.classList.add('hidden');
            }
        });
    }
    
    // Menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    const closeIcon = document.getElementById('closeIcon');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            isSidebarOpen = !isSidebarOpen;
            
            if (isSidebarOpen) {
                sidebar?.classList.remove('translate-x-full');
                sidebarOverlay?.classList.remove('hidden');
                sidebarOverlay?.classList.add('opacity-100');
                hamburgerIcon?.classList.add('hidden');
                closeIcon?.classList.remove('hidden');
            } else {
                sidebar?.classList.add('translate-x-full');
                sidebarOverlay?.classList.add('hidden');
                sidebarOverlay?.classList.remove('opacity-100');
                hamburgerIcon?.classList.remove('hidden');
                closeIcon?.classList.add('hidden');
            }
        });
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            if (isSidebarOpen) {
                menuToggle?.click();
            }
        });
    }
    
    // Drawer overlay click
    const drawerOverlay = document.getElementById('drawerOverlay');
    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', () => {
            if (currentDrawer) {
                closeDrawer(currentDrawer);
            }
        });
    }
    
    // Input validation for placa (only alphanumeric, max 7 chars)
    const inputPlaca = document.getElementById('inputPlaca');
    if (inputPlaca) {
        inputPlaca.addEventListener('input', (e) => {
            let value = e.target.value;
            // Remove caracteres que não sejam letras ou números e limitar a 7 caracteres
            value = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 7);
            e.target.value = value;
        });
    }
});

// Close custom selects when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select.active').forEach(s => {
        s.classList.remove('active', 'dropdown-up');
        const dropdown = s.querySelector('.custom-select-dropdown');
        if (dropdown) dropdown.style.display = 'none';
        
        // Remove contrast from drawer
        const drawer = s.closest('[id^="drawer"]');
        if (drawer) {
            const drawerContent = drawer.querySelector('.overflow-y-auto');
            if (drawerContent) {
                drawerContent.classList.remove('select-active');
            }
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Space bar to play/pause
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        togglePlay();
    }
    
    // ESC to close sidebar/drawer
    if (e.code === 'Escape') {
        if (currentDrawer) {
            closeDrawer(currentDrawer);
        } else if (isSidebarOpen) {
            document.getElementById('menuToggle')?.click();
        }
    }
    
    // M to open menu
    if (e.code === 'KeyM' && !isSidebarOpen) {
        document.getElementById('menuToggle')?.click();
    }
});

// Make functions global so onclick can access them
window.openDrawer = openDrawer;
window.closeDrawer = closeDrawer;
window.openDrawerAndCloseSidebar = openDrawerAndCloseSidebar;
window.showToast = showToast;
window.removeToast = removeToast;
window.playFuncionarios = playFuncionarios;
window.playVeiculos = playVeiculos;
window.playAnuncio = playAnuncio;
window.salvarAnuncios = salvarAnuncios;
window.changeCounter = changeCounter;
window.openFilesModal = openFilesModal;
window.closeFilesModal = closeFilesModal;
window.playFile = playFile;
window.openEditFileModal = openEditFileModal;
window.closeEditFileModal = closeEditFileModal;
window.toggleIndeterminate = toggleIndeterminate;
window.saveFileEdit = saveFileEdit;
window.toggleMusicDropdown = toggleMusicDropdown;
window.toggleEstiloCheckbox = toggleEstiloCheckbox;
window.saveEstilosMusicais = saveEstilosMusicais;
window.switchEstilosTab = switchEstilosTab;
window.filterEstilosMusicais = filterEstilosMusicais;
window.openUploadModal = openUploadModal;
  window.closeUploadModal = closeUploadModal;
  window.toggleIndeterminateUpload = toggleIndeterminateUpload;
  window.saveUpload = saveUpload;
  window.openSugestaoModal = openSugestaoModal;
  window.closeSugestaoModal = closeSugestaoModal;
  window.saveSugestao = saveSugestao;
  window.openPedidosModal = openPedidosModal;
  window.closePedidosModal = closePedidosModal;
  window.pedidosNextStep = pedidosNextStep;
  window.pedidosPreviousStep = pedidosPreviousStep;
  window.handlePedidoFileUpload = handlePedidoFileUpload;
  window.enviarPedido = enviarPedido;
  window.openDadosCadastraisModal = openDadosCadastraisModal;
  window.closeDadosCadastraisModal = closeDadosCadastraisModal;
  window.saveDadosCadastrais = saveDadosCadastrais;
  window.openAlterarSenhaModal = openAlterarSenhaModal;
  window.closeAlterarSenhaModal = closeAlterarSenhaModal;
  window.saveAlterarSenha = saveAlterarSenha;
  window.openAlterarLogoModal = openAlterarLogoModal;
  window.closeAlterarLogoModal = closeAlterarLogoModal;
  window.saveAlterarLogo = saveAlterarLogo;
  window.openProgramacaoModal = openProgramacaoModal;
  window.closeProgramacaoModal = closeProgramacaoModal;
  window.openRelatorioPedidosModal = openRelatorioPedidosModal;
  window.closeRelatorioPedidosModal = closeRelatorioPedidosModal;
window.openFaturasModal = openFaturasModal;
  window.closeFaturasModal = closeFaturasModal;
  window.openAdicionarTextoModal = openAdicionarTextoModal;
  window.closeAdicionarTextoModal = closeAdicionarTextoModal;
  window.salvarTextoLocucao = salvarTextoLocucao;
  window.openAdicionarLinkModal = openAdicionarLinkModal;
  window.closeAdicionarLinkModal = closeAdicionarLinkModal;
  window.salvarNovoLink = salvarNovoLink;
