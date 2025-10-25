// Section navigation system
let currentSection = null;
let sectionHistory = [];

// Open a section
function openSection(sectionId) {
    const section = document.getElementById(`section-${sectionId}`);
    if (!section) {
        console.warn(`Section not found: ${sectionId}`);
        return;
    }
    
    // Close current section if different
    if (currentSection && currentSection !== sectionId) {
        closeSection(currentSection);
    }
    
    // Add to history
    if (currentSection !== sectionId) {
        sectionHistory.push(sectionId);
    }
    
    // Open new section
    section.classList.add('active');
    currentSection = sectionId;
    
    // Update breadcrumb (desktop)
    updateBreadcrumb(sectionId);
    
    // Scroll to top
    const sectionContent = section.querySelector('.section-content-mobile');
    if (sectionContent) {
        sectionContent.scrollTop = 0;
    }
    
    console.log(`Opened section: ${sectionId}`);
}

// Close a section
function closeSection(sectionId) {
    const section = document.getElementById(`section-${sectionId}`);
    if (!section) return;
    
    section.classList.remove('active');
    
    if (currentSection === sectionId) {
        currentSection = null;
    }
    
    // Remove from history
    const index = sectionHistory.indexOf(sectionId);
    if (index > -1) {
        sectionHistory.splice(index, 1);
    }
}

// Go back to previous section
function goBackSection() {
    if (sectionHistory.length <= 1) {
        // No previous section, close current
        if (currentSection) {
            closeSection(currentSection);
        }
        return;
    }
    
    // Remove current from history
    sectionHistory.pop();
    
    // Get previous section
    const previousSection = sectionHistory[sectionHistory.length - 1];
    
    // Close current
    if (currentSection) {
        const section = document.getElementById(`section-${currentSection}`);
        section?.classList.remove('active');
    }
    
    // Open previous
    currentSection = previousSection;
    const section = document.getElementById(`section-${previousSection}`);
    section?.classList.add('active');
    
    // Update breadcrumb
    updateBreadcrumb(previousSection);
}

// Update breadcrumb for desktop
function updateBreadcrumb(sectionId) {
    const breadcrumb = document.getElementById('breadcrumb');
    if (!breadcrumb || !window.isDesktop?.()) return;
    
    // Get section title
    const sectionTitleMap = {
        'funcionarios': 'Chamada Funcionários',
        'veiculos': 'Chamada de Veículos',
        'anuncios': 'Anúncios Gerais',
        'programacao-anuncios': 'Programação de Anúncios',
        'configurar': 'Configurar Anúncios',
        'estilos': 'Estilos Musicais'
    };
    
    const title = sectionTitleMap[sectionId] || sectionId;
    
    breadcrumb.innerHTML = `
        <div class="breadcrumb-item">
            <span style="cursor: pointer;" onclick="closeAllSections()">Home</span>
        </div>
        <div class="breadcrumb-item">
            <span>›</span>
            <span>${title}</span>
        </div>
    `;
}

// Close all sections
function closeAllSections() {
    document.querySelectorAll('.section-mobile').forEach(section => {
        section.classList.remove('active');
    });
    
    currentSection = null;
    sectionHistory = [];
    
    // Clear breadcrumb
    const breadcrumb = document.getElementById('breadcrumb');
    if (breadcrumb) {
        breadcrumb.innerHTML = '';
    }
    
    // Clear active states in sidebar
    document.querySelectorAll('.sidebar-collapse-item').forEach(item => {
        item.classList.remove('active');
    });
}

// Handle mobile swipe down to close
let touchStartY = 0;
let touchEndY = 0;

function handleSectionSwipe(sectionId) {
    const sectionHeader = document.querySelector(`#section-${sectionId} .section-header-mobile`);
    if (!sectionHeader) return;
    
    sectionHeader.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    sectionHeader.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        const swipeDistance = touchEndY - touchStartY;
        
        // If swipe down more than 100px, close section
        if (swipeDistance > 100) {
            goBackSection();
        }
    });
}

// Initialize sections
document.addEventListener('DOMContentLoaded', () => {
    // Set up swipe handlers for all sections
    document.querySelectorAll('.section-mobile').forEach(section => {
        const sectionId = section.id.replace('section-', '');
        handleSectionSwipe(sectionId);
    });
});

// Export functions
window.openSection = openSection;
window.closeSection = closeSection;
window.goBackSection = goBackSection;
window.closeAllSections = closeAllSections;
window.getCurrentSection = () => currentSection;
