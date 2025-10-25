// Sidebar functionality for all breakpoints
let isSidebarOpen = false;
let activeCollapseSection = 'player'; // Default open section

// Toggle sidebar mobile
function toggleSidebarMobile() {
    const sidebar = document.getElementById('sidebarMobile');
    const overlay = document.getElementById('sidebarOverlay');
    
    isSidebarOpen = !isSidebarOpen;
    
    if (isSidebarOpen) {
        sidebar?.classList.add('open');
        overlay?.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    } else {
        closeSidebarMobile();
    }
}

function closeSidebarMobile() {
    const sidebar = document.getElementById('sidebarMobile');
    const overlay = document.getElementById('sidebarOverlay');
    
    isSidebarOpen = false;
    sidebar?.classList.remove('open');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
}

// Toggle collapse sections
function toggleCollapse(sectionId) {
    const content = document.getElementById(`collapse-${sectionId}`);
    const chevron = document.getElementById(`chevron-${sectionId}`);
    
    if (!content || !chevron) return;
    
    const isExpanded = content.classList.contains('expanded');
    
    // Close all other sections
    document.querySelectorAll('.sidebar-collapse-content').forEach(c => {
        if (c !== content) {
            c.classList.remove('expanded');
        }
    });
    
    document.querySelectorAll('.sidebar-collapse-chevron').forEach(ch => {
        if (ch !== chevron) {
            ch.classList.remove('rotated');
        }
    });
    
    // Toggle current section
    if (isExpanded) {
        content.classList.remove('expanded');
        chevron.classList.remove('rotated');
        activeCollapseSection = null;
    } else {
        content.classList.add('expanded');
        chevron.classList.add('rotated');
        activeCollapseSection = sectionId;
    }
}

// Handle sidebar item click
function handleSidebarItemClick(type, id) {
    // If it's a modal, open modal
    if (type === 'modal') {
        openModalById(id);
        // Close sidebar on mobile
        if (window.isMobile?.()) {
            closeSidebarMobile();
        }
        return;
    }
    
    // If it's a section, open section
    if (type === 'section') {
        openSection(id);
        // Close sidebar on mobile
        if (window.isMobile?.()) {
            closeSidebarMobile();
        }
        
        // Update active state
        updateSidebarActiveState(id);
    }
}

// Update active state in sidebar
function updateSidebarActiveState(activeId) {
    // Remove all active states
    document.querySelectorAll('.sidebar-collapse-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.querySelectorAll('.sidebar-menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.querySelectorAll('.sidebar-tablet-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active state to clicked item
    const activeItems = document.querySelectorAll(`[data-section="${activeId}"]`);
    activeItems.forEach(item => {
        item.classList.add('active');
    });
}

// Helper to open modal by ID
function openModalById(modalId) {
    // Map modal IDs to their open functions
    const modalMap = {
        'upload': () => openUploadModal?.(),
        'sugestoes': () => openSugestaoModal?.(),
        'pedido': () => openPedidosModal?.(),
        'agendar': () => openAgendarModal?.(),
        'programacao': () => openProgramacaoModal?.(),
        'relatorio': () => openRelatorioPedidosModal?.(),
        'faturas': () => openFaturasModal?.(),
        'dados': () => openDadosCadastraisModal?.(),
        'senha': () => openAlterarSenhaModal?.(),
        'logo': () => openAlterarLogoModal?.()
    };
    
    const openFunction = modalMap[modalId];
    if (openFunction) {
        openFunction();
    }
}

// Initialize sidebar on load
document.addEventListener('DOMContentLoaded', () => {
    // Open default collapse section
    const defaultCollapse = document.getElementById(`collapse-${activeCollapseSection}`);
    const defaultChevron = document.getElementById(`chevron-${activeCollapseSection}`);
    
    if (defaultCollapse && defaultChevron) {
        defaultCollapse.classList.add('expanded');
        defaultChevron.classList.add('rotated');
    }
    
    // Close sidebar when clicking overlay
    const overlay = document.getElementById('sidebarOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeSidebarMobile);
    }
    
    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isSidebarOpen) {
            closeSidebarMobile();
        }
    });
});

// Export functions to global scope
window.toggleSidebarMobile = toggleSidebarMobile;
window.closeSidebarMobile = closeSidebarMobile;
window.toggleCollapse = toggleCollapse;
window.handleSidebarItemClick = handleSidebarItemClick;
