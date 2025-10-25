// Touch gesture handlers for mobile

// Swipe to open sidebar
let touchStartX = 0;
let touchEndX = 0;
const SWIPE_THRESHOLD = 80;

function handleSwipeGestures() {
    // Edge swipe to open sidebar
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    
    // Only on mobile
    if (!window.isMobile?.()) return;
    
    // Swipe from left edge to open sidebar
    if (touchStartX < 20 && swipeDistance > SWIPE_THRESHOLD && !isSidebarOpen) {
        toggleSidebarMobile?.();
    }
    
    // Swipe to right to close sidebar
    if (isSidebarOpen && swipeDistance > SWIPE_THRESHOLD) {
        closeSidebarMobile?.();
    }
}

// Tap feedback with ripple effect
function addRippleEffect(element) {
    element.addEventListener('click', function(e) {
        // Create ripple element
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        
        // Calculate position
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        // Remove after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Haptic feedback (vibration)
function vibrateOnTap(duration = 10) {
    if ('vibrate' in navigator) {
        navigator.vibrate(duration);
    }
}

// Add vibration to buttons
function addVibrationToButtons() {
    const buttons = document.querySelectorAll('button, .sidebar-menu-item, .sidebar-collapse-item, .fab-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            vibrateOnTap(10);
        });
    });
}

// Pull to refresh (optional)
let pullStartY = 0;
let pullDistance = 0;
const PULL_THRESHOLD = 80;

function initPullToRefresh() {
    const content = document.querySelector('.main-content-mobile');
    if (!content) return;
    
    let isPulling = false;
    
    content.addEventListener('touchstart', (e) => {
        if (content.scrollTop === 0) {
            pullStartY = e.touches[0].screenY;
            isPulling = true;
        }
    }, { passive: true });
    
    content.addEventListener('touchmove', (e) => {
        if (!isPulling) return;
        
        pullDistance = e.touches[0].screenY - pullStartY;
        
        if (pullDistance > 0 && pullDistance < PULL_THRESHOLD * 2) {
            // Visual feedback (optional)
            content.style.transform = `translateY(${pullDistance / 3}px)`;
        }
    }, { passive: true });
    
    content.addEventListener('touchend', () => {
        if (isPulling && pullDistance > PULL_THRESHOLD) {
            // Trigger refresh
            handleRefresh();
        }
        
        // Reset
        content.style.transform = '';
        isPulling = false;
        pullDistance = 0;
    }, { passive: true });
}

function handleRefresh() {
    console.log('Pull to refresh triggered');
    
    // Show toast
    if (window.showToast) {
        window.showToast('Atualizando...', 'info');
    }
    
    // Simulate refresh
    setTimeout(() => {
        if (window.showToast) {
            window.showToast('Atualizado com sucesso!', 'success');
        }
    }, 1000);
}

// Long press detection
function addLongPressListener(element, callback, duration = 500) {
    let pressTimer;
    
    element.addEventListener('touchstart', (e) => {
        pressTimer = setTimeout(() => {
            callback(e);
            vibrateOnTap(20);
        }, duration);
    });
    
    element.addEventListener('touchend', () => {
        clearTimeout(pressTimer);
    });
    
    element.addEventListener('touchmove', () => {
        clearTimeout(pressTimer);
    });
}

// Double tap to like (player)
let lastTap = 0;
const DOUBLE_TAP_DELAY = 300;

function initDoubleTap() {
    const playerInfo = document.querySelector('.player-info-mobile');
    if (!playerInfo) return;
    
    playerInfo.addEventListener('touchend', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < DOUBLE_TAP_DELAY && tapLength > 0) {
            // Double tap detected
            handleDoubleTap();
            e.preventDefault();
        }
        
        lastTap = currentTime;
    });
}

function handleDoubleTap() {
    console.log('Double tap detected - like action');
    
    const likeBtn = document.getElementById('likeBtnMobile');
    if (likeBtn) {
        likeBtn.click();
    }
    
    vibrateOnTap(20);
}

// Initialize all gestures
function initializeGestures() {
    // Only on mobile
    if (!window.isMobile?.() && !window.isTablet?.()) return;
    
    handleSwipeGestures();
    addVibrationToButtons();
    // initPullToRefresh(); // Optional
    // initDoubleTap(); // Optional
    
    console.log('Touch gestures initialized');
}

// Initialize on load and breakpoint change
document.addEventListener('DOMContentLoaded', initializeGestures);
window.addEventListener('breakpointchange', (e) => {
    if (e.detail.breakpoint === 'mobile' || e.detail.breakpoint === 'tablet') {
        initializeGestures();
    }
});

// Export functions
window.vibrateOnTap = vibrateOnTap;
window.addRippleEffect = addRippleEffect;
window.addLongPressListener = addLongPressListener;
