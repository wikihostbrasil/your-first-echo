// =====================================
// PLAYER REFATORADO - MAIN SCRIPTS
// =====================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MENU DROPDOWN (Desktop) =====
    const menuDropdownBtn = document.getElementById('menu-dropdown-btn');
    const menuDropdown = document.getElementById('menu-dropdown');
    
    if (menuDropdownBtn && menuDropdown) {
        menuDropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            menuDropdown.classList.toggle('hidden');
            
            // Rotate chevron
            const chevron = menuDropdownBtn.querySelector('.bx-chevron-down');
            if (chevron) {
                chevron.style.transform = menuDropdown.classList.contains('hidden') 
                    ? 'rotate(0deg)' 
                    : 'rotate(180deg)';
            }
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuDropdownBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
                menuDropdown.classList.add('hidden');
                const chevron = menuDropdownBtn.querySelector('.bx-chevron-down');
                if (chevron) chevron.style.transform = 'rotate(0deg)';
            }
        });
        
        // Close when clicking on links
        menuDropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menuDropdown.classList.add('hidden');
                const chevron = menuDropdownBtn.querySelector('.bx-chevron-down');
                if (chevron) chevron.style.transform = 'rotate(0deg)';
            });
        });
    }
    
    // ===== USER MENU DROPDOWN =====
    const userMenuBtn = document.getElementById('user-menu-btn');
    const userDropdown = document.getElementById('user-dropdown');
    
    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('hidden');
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.add('hidden');
            }
        });
        
        // Close when clicking on links
        userDropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                userDropdown.classList.add('hidden');
            });
        });
    }
    
    // ===== MOBILE MENU =====
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Change icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.className = mobileMenu.classList.contains('hidden') 
                    ? 'bx bx-menu text-2xl' 
                    : 'bx bx-x text-2xl';
            }
        });
        
        // Mobile menu sections (accordion)
        const mobileSections = document.querySelectorAll('.mobile-menu-section');
        mobileSections.forEach(section => {
            section.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const chevron = this.querySelector('.bx-chevron-down');
                
                if (content && content.classList.contains('mobile-menu-content')) {
                    content.classList.toggle('hidden');
                    
                    if (chevron) {
                        chevron.style.transform = content.classList.contains('hidden') 
                            ? 'rotate(0deg)' 
                            : 'rotate(180deg)';
                    }
                }
            });
        });
    }
    
    // ===== ACCORDION =====
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            
            // Toggle active class
            this.classList.toggle('active');
            
            if (content && content.classList.contains('accordion-content')) {
                content.classList.toggle('active');
            }
        });
    });
    
    // ===== QUANTITY CONTROLS =====
    document.querySelectorAll('.quantity-control').forEach(control => {
        const minusBtn = control.querySelector('.quantity-btn:first-child');
        const plusBtn = control.querySelector('.quantity-btn:last-child');
        const input = control.querySelector('.quantity-input');
        
        if (minusBtn && plusBtn && input) {
            minusBtn.addEventListener('click', function() {
                let value = parseInt(input.value) || 0;
                if (value > 0) {
                    input.value = value - 1;
                }
            });
            
            plusBtn.addEventListener('click', function() {
                let value = parseInt(input.value) || 0;
                input.value = value + 1;
            });
            
            // Prevent invalid input
            input.addEventListener('input', function() {
                let value = parseInt(this.value);
                if (isNaN(value) || value < 0) {
                    this.value = 0;
                }
            });
        }
    });
    
    // ===== MODAL =====
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');
    const cancelModalBtn = document.getElementById('cancelarModal');
    const enviarModalBtn = document.getElementById('enviarModal');
    
    if (openModalBtn && modal) {
        openModalBtn.addEventListener('click', function() {
            modal.classList.remove('hidden');
            setTimeout(() => modal.classList.add('show'), 10);
        });
    }
    
    function closeModal() {
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (cancelModalBtn) {
        cancelModalBtn.addEventListener('click', closeModal);
    }
    
    if (enviarModalBtn) {
        enviarModalBtn.addEventListener('click', function() {
            // Validate form
            const form = modal.querySelector('form');
            if (form && form.checkValidity()) {
                alert('Pedido enviado com sucesso!');
                closeModal();
                form.reset();
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // ===== CHOICES.JS INITIALIZATION (Employee Selects) =====
    const employeeSelects = document.querySelectorAll('.employee-select');
    
    if (typeof Choices !== 'undefined' && employeeSelects.length > 0) {
        employeeSelects.forEach(select => {
            new Choices(select, {
                searchEnabled: true,
                removeItemButton: false,
                placeholder: true,
                placeholderValue: 'Selecione...',
                noChoicesText: 'Nenhuma opção disponível',
                noResultsText: 'Nenhum resultado encontrado',
                itemSelectText: '',
                searchPlaceholderValue: 'Digite para buscar...',
            });
        });
    }
    
    // ===== MUSIC CARDS (Checkbox behavior) =====
    const musicCheckboxes = document.querySelectorAll('.music-checkbox');
    
    musicCheckboxes.forEach(checkbox => {
        const card = checkbox.closest('.music-card');
        if (card) {
            card.addEventListener('click', function(e) {
                // Prevent double toggle when clicking directly on checkbox
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
            });
        }
    });
    
    // ===== FOLDER BUTTONS =====
    const folderButtons = document.querySelectorAll('.btn-folder');
    
    folderButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const folderType = this.closest('.anuncio-card')
                ?.querySelector('.font-bold')?.textContent || 'pasta';
            console.log(`Abrindo pasta: ${folderType}`);
            alert(`Abrindo pasta: ${folderType}`);
        });
    });
    
    // ===== PLAYER CONTROLS =====
    const playBtn = document.querySelector('.player-play-btn');
    let isPlaying = false;
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            isPlaying = !isPlaying;
            const icon = this.querySelector('i');
            
            if (icon) {
                icon.className = isPlaying ? 'bx bx-pause' : 'bx bx-play';
            }
        });
    }
    
    // Previous/Next buttons
    const prevBtn = document.querySelector('.player-control-btn:first-child');
    const nextBtn = document.querySelector('.player-control-btn:last-child');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            console.log('Previous track');
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            console.log('Next track');
        });
    }
    
    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('Player Refatorado - Scripts loaded successfully! 🎵');
});

// ===== UTILITY FUNCTIONS =====

// Format time for player
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}