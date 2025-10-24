// Main initialization and event listeners

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
