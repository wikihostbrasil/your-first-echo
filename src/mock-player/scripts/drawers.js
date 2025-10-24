// Drawer and sidebar state
let isSidebarOpen = false;
let currentDrawer = null;
let isDarkMode = true;

// Function to close sidebar and open drawer
function openDrawerAndCloseSidebar(type) {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    const closeIcon = document.getElementById('closeIcon');
    
    // Close sidebar first if it's open
    if (isSidebarOpen) {
        sidebar.classList.add('translate-x-full');
        sidebarOverlay.classList.add('hidden');
        sidebarOverlay.classList.remove('opacity-100');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        isSidebarOpen = false;
    }
    
    // Small delay before opening drawer
    setTimeout(() => {
        openDrawer(type);
    }, 300);
}

function openDrawer(type) {
    // Ensure custom selects are initialized
    if (typeof initCustomSelects === 'function') {
        initCustomSelects();
    }

    // Close any open drawer
    if (currentDrawer) {
        closeDrawer(currentDrawer);
    }

    // Open new drawer
    const drawer = document.getElementById(`drawer${type.charAt(0).toUpperCase() + type.slice(1)}`);
    const footerPlayer = document.getElementById('footerPlayer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    
    if (drawer) {
        footerPlayer.classList.add('hidden');
        drawer.classList.remove('translate-y-full');
        // Show drawer overlay only (not sidebar overlay)
        drawerOverlay.classList.remove('hidden', 'opacity-0');
        requestAnimationFrame(() => {
            drawerOverlay.classList.add('opacity-100');
        });
        currentDrawer = type;
    }
}

function closeDrawer(type) {
    const drawer = document.getElementById(`drawer${type.charAt(0).toUpperCase() + type.slice(1)}`);
    const footerPlayer = document.getElementById('footerPlayer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    
    if (drawer) {
        drawer.classList.add('translate-y-full');
        footerPlayer.classList.remove('hidden');
        // Hide overlay with fade
        drawerOverlay.classList.remove('opacity-100');
        drawerOverlay.classList.add('opacity-0');
        setTimeout(() => {
            drawerOverlay.classList.add('hidden');
        }, 300);
        currentDrawer = null;
    }
}
