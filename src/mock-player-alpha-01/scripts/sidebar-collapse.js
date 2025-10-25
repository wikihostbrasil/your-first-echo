// Sidebar collapse functionality
function toggleCollapse(section) {
    const collapseElement = document.getElementById(`collapse-${section}`);
    const chevronElement = document.getElementById(`chevron-${section}`);
    
    if (collapseElement && chevronElement) {
        const isHidden = collapseElement.classList.contains('hidden');
        
        if (isHidden) {
            // Open this collapse
            collapseElement.classList.remove('hidden');
            chevronElement.classList.add('rotate-180');
        } else {
            // Close this collapse
            collapseElement.classList.add('hidden');
            chevronElement.classList.remove('rotate-180');
        }
    }
}

// Initialize first collapse as open
document.addEventListener('DOMContentLoaded', function() {
    const firstCollapse = document.getElementById('collapse-player');
    const firstChevron = document.getElementById('chevron-player');
    
    if (firstCollapse && firstChevron) {
        firstCollapse.classList.remove('hidden');
        firstChevron.classList.add('rotate-180');
    }
});
