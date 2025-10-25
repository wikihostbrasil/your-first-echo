// Header functionality - Avatar dropdown and theme toggle
let isAvatarDropdownOpen = false;

// Toggle avatar dropdown
function toggleAvatarDropdown() {
    const dropdown = document.getElementById('avatarDropdown');
    if (!dropdown) return;
    
    isAvatarDropdownOpen = !isAvatarDropdownOpen;
    
    if (isAvatarDropdownOpen) {
        dropdown.classList.add('active');
        
        // On mobile, prevent body scroll
        if (window.isMobile?.()) {
            document.body.style.overflow = 'hidden';
        }
    } else {
        closeAvatarDropdown();
    }
}

function closeAvatarDropdown() {
    const dropdown = document.getElementById('avatarDropdown');
    if (!dropdown) return;
    
    isAvatarDropdownOpen = false;
    dropdown.classList.remove('active');
    document.body.style.overflow = '';
}

// Handle avatar dropdown item click
function handleAvatarItemClick(action) {
    closeAvatarDropdown();
    
    // Map actions to functions
    const actionMap = {
        'dados': () => openDadosCadastraisModal?.(),
        'senha': () => openAlterarSenhaModal?.(),
        'logo': () => openAlterarLogoModal?.(),
        'sair': () => handleLogout()
    };
    
    const actionFunction = actionMap[action];
    if (actionFunction) {
        actionFunction();
    }
}

// Handle logout
function handleLogout() {
    if (confirm('Deseja realmente sair?')) {
        // Show toast
        if (window.showToast) {
            window.showToast('Até logo! Você foi desconectado.', 'info');
        }
        
        // Redirect after a delay
        setTimeout(() => {
            window.location.href = 'auth.html';
        }, 1500);
    }
}

// Handle share button
function handleShare() {
    const shareData = {
        title: 'Rádio Mix FM',
        text: 'Ouça a melhor rádio do Brasil!',
        url: window.location.href
    };
    
    // Check if Web Share API is supported
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => {
                if (window.showToast) {
                    window.showToast('Compartilhado com sucesso!', 'success');
                }
            })
            .catch((err) => {
                console.log('Erro ao compartilhar:', err);
            });
    } else {
        // Fallback: Copy link to clipboard
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                if (window.showToast) {
                    window.showToast('Link copiado para a área de transferência!', 'success');
                }
            })
            .catch(() => {
                if (window.showToast) {
                    window.showToast('Não foi possível copiar o link', 'error');
                }
            });
    }
}

// Theme toggle functionality
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    
    if (isDark) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
    
    // Update icon visibility
    updateThemeIcon(!isDark);
}

function updateThemeIcon(isDark) {
    const sunIcons = document.querySelectorAll('[data-theme-icon="sun"]');
    const moonIcons = document.querySelectorAll('[data-theme-icon="moon"]');
    
    if (isDark) {
        sunIcons.forEach(icon => icon.classList.add('hidden'));
        moonIcons.forEach(icon => icon.classList.remove('hidden'));
    } else {
        sunIcons.forEach(icon => icon.classList.remove('hidden'));
        moonIcons.forEach(icon => icon.classList.add('hidden'));
    }
}

// Initialize theme on load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    if (shouldBeDark) {
        document.documentElement.classList.add('dark');
        updateThemeIcon(true);
    } else {
        document.documentElement.classList.remove('dark');
        updateThemeIcon(false);
    }
}

// Close dropdown when clicking outside
function handleClickOutside(event) {
    if (!isAvatarDropdownOpen) return;
    
    const dropdown = document.getElementById('avatarDropdown');
    const avatarBtn = document.getElementById('avatarBtn');
    
    if (!dropdown || !avatarBtn) return;
    
    // Check if click is outside
    if (!dropdown.contains(event.target) && !avatarBtn.contains(event.target)) {
        closeAvatarDropdown();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    
    // Add click outside listener
    document.addEventListener('click', handleClickOutside);
    
    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isAvatarDropdownOpen) {
            closeAvatarDropdown();
        }
    });
});

// Export functions
window.toggleAvatarDropdown = toggleAvatarDropdown;
window.closeAvatarDropdown = closeAvatarDropdown;
window.handleAvatarItemClick = handleAvatarItemClick;
window.handleShare = handleShare;
window.toggleTheme = toggleTheme;
window.handleLogout = handleLogout;
