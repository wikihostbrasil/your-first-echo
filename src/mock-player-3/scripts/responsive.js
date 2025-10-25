// Responsive layout manager
let currentBreakpoint = 'mobile';

function detectBreakpoint() {
    const width = window.innerWidth;
    let newBreakpoint;
    
    if (width < 768) {
        newBreakpoint = 'mobile';
    } else if (width < 1024) {
        newBreakpoint = 'tablet';
    } else {
        newBreakpoint = 'desktop';
    }
    
    if (newBreakpoint !== currentBreakpoint) {
        currentBreakpoint = newBreakpoint;
        handleBreakpointChange(newBreakpoint);
    }
    
    return newBreakpoint;
}

function handleBreakpointChange(breakpoint) {
    // Close mobile sidebar when transitioning to tablet/desktop
    if (breakpoint !== 'mobile' && isSidebarOpen) {
        closeSidebarMobile();
    }
    
    // Close fullscreen sections on mobile when transitioning to tablet/desktop
    if (breakpoint !== 'mobile') {
        const activeSections = document.querySelectorAll('.section-mobile.active');
        activeSections.forEach(section => {
            section.classList.remove('active');
        });
    }
    
    // Adjust layout based on breakpoint
    adjustLayout(breakpoint);
    
    console.log(`Breakpoint changed to: ${breakpoint}`);
}

function adjustLayout(breakpoint) {
    const body = document.body;
    
    // Remove all breakpoint classes
    body.classList.remove('is-mobile', 'is-tablet', 'is-desktop');
    
    // Add current breakpoint class
    body.classList.add(`is-${breakpoint}`);
    
    // Emit custom event for other scripts
    window.dispatchEvent(new CustomEvent('breakpointchange', {
        detail: { breakpoint }
    }));
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    detectBreakpoint();
});

// Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        detectBreakpoint();
    }, 150);
});

// Orientation change handler (mobile/tablet)
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        detectBreakpoint();
    }, 200);
});

// Export functions
window.getCurrentBreakpoint = () => currentBreakpoint;
window.isMobile = () => currentBreakpoint === 'mobile';
window.isTablet = () => currentBreakpoint === 'tablet';
window.isDesktop = () => currentBreakpoint === 'desktop';
