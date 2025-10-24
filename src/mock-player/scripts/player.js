// Player state
let isPlaying = false;
let isLiked = false;
let progress = 45;
let volume = 80;

// Player functions
function togglePlay() {
    isPlaying = !isPlaying;
    
    const playIcon = `<svg class="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>`;
    const pauseIcon = `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path></svg>`;
    const playIconMobile = `<svg class="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>`;
    const pauseIconMobile = `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path></svg>`;
    
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseBtnMobile = document.getElementById('playPauseBtnMobile');
    
    if (isPlaying) {
        playPauseBtn.innerHTML = pauseIcon;
        playPauseBtnMobile.innerHTML = pauseIconMobile;
    } else {
        playPauseBtn.innerHTML = playIcon;
        playPauseBtnMobile.innerHTML = playIconMobile;
    }
    
    syncVisualizerWithPlay();
}

function toggleLike(btn) {
    isLiked = !isLiked;
    
    if (isLiked) {
        btn.classList.add('text-green-500');
        btn.classList.remove('text-gray-400', 'dark:text-gray-400', 'text-gray-600', 'dark:text-gray-600');
        btn.innerHTML = `
            <svg class="w-${btn === likeBtnMobile ? '5' : '4'} h-${btn === likeBtnMobile ? '5' : '4'}" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
        `;
    } else {
        btn.classList.remove('text-green-500');
        btn.classList.add('text-gray-600', 'dark:text-gray-400');
        btn.innerHTML = `
            <svg class="w-${btn === likeBtnMobile ? '5' : '4'} h-${btn === likeBtnMobile ? '5' : '4'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
        `;
    }
}

function syncVisualizerWithPlay() {
    const audioVisualizerElement = document.getElementById('audioVisualizer');
    if (isPlaying) {
        audioVisualizerElement.classList.remove('hidden');
    } else {
        audioVisualizerElement.classList.add('hidden');
    }
}

// Play functions with enhanced toast feedback
function playFuncionarios() {
    const audioVis = document.getElementById('audioVisualizer');
    audioVis.classList.remove('hidden');
    showToast('🎵 Reproduzindo chamada de funcionários...', 'success');
    
    // Simulate playback
    setTimeout(() => {
        audioVis.classList.add('hidden');
        showToast('✓ Chamada reproduzida com sucesso!', 'info');
    }, 3000);
}

function playVeiculos() {
    const audioVis = document.getElementById('audioVisualizer');
    const placa = document.querySelector('input[placeholder="DIGITE A PLACA"]')?.value;
    
    if (!placa || placa.trim() === '') {
        showToast('⚠️ Por favor, digite a placa do veículo', 'error');
        return;
    }
    
    audioVis.classList.remove('hidden');
    showToast(`🚗 Reproduzindo chamada para veículo ${placa}...`, 'success');
    
    setTimeout(() => {
        audioVis.classList.add('hidden');
        showToast('✓ Chamada reproduzida com sucesso!', 'info');
    }, 3000);
}

function playAnuncio() {
    const audioVis = document.getElementById('audioVisualizer');
    audioVis.classList.remove('hidden');
    showToast('📢 Reproduzindo anúncio geral...', 'success');
    
    setTimeout(() => {
        audioVis.classList.add('hidden');
        showToast('✓ Anúncio reproduzido com sucesso!', 'info');
    }, 3000);
}

function salvarAnuncios() {
    showToast('💾 Configurações salvas com sucesso!', 'success');
}

function playFile(fileName) {
    showToast(`🎵 Reproduzindo ${fileName}...`, 'success');
}

// Counter functionality
function changeCounter(button, delta) {
    const counterSpan = button.parentElement.querySelector('span');
    let currentValue = parseInt(counterSpan.textContent);
    let newValue = currentValue + delta;
    
    // Limit between 1 and 99
    if (newValue < 1) newValue = 1;
    if (newValue > 99) newValue = 99;
    
    counterSpan.textContent = newValue;
}
