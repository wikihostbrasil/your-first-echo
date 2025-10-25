// Music styles dropdown toggle
function toggleMusicDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.classList.toggle('hidden');
}

// Toggle checkbox when clicking on the card
function toggleEstiloCheckbox(checkboxId, event) {
    // Prevent triggering if clicking directly on checkbox or buttons
    if (event.target.type === 'checkbox' || event.target.tagName === 'BUTTON' || event.target.type === 'radio') {
        return;
    }
    
    const checkbox = document.getElementById(checkboxId);
    if (checkbox) {
        checkbox.checked = !checkbox.checked;
    }
}

// Switch between music styles tabs
function switchEstilosTab(tabName) {
    // Hide all tab contents
    const allContents = document.querySelectorAll('.estilos-tab-content');
    allContents.forEach(content => content.classList.add('hidden'));
    
    // Remove active class from all tabs
    const allTabs = document.querySelectorAll('.estilos-tab');
    allTabs.forEach(tab => {
        tab.classList.remove('active', 'border-pink-600', 'text-pink-600', 'dark:text-pink-400');
        tab.classList.add('border-transparent', 'text-gray-600', 'dark:text-gray-400');
    });
    
    // Show selected tab content
    const selectedContent = document.getElementById(`tab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
    if (selectedContent) {
        selectedContent.classList.remove('hidden');
    }
    
    // Set active class on selected tab
    const activeTab = event.target;
    activeTab.classList.add('active', 'border-pink-600', 'text-pink-600', 'dark:text-pink-400');
    activeTab.classList.remove('border-transparent', 'text-gray-600', 'dark:text-gray-400');
}

// Filter music styles based on search
function filterEstilosMusicais(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    const visibleContent = document.querySelector('.estilos-tab-content:not(.hidden)');
    if (!visibleContent) return;
    
    const allItems = visibleContent.querySelectorAll('.estilo-item');
    const categories = visibleContent.querySelectorAll('.mb-8');
    
    allItems.forEach(item => {
        const label = item.querySelector('label');
        const description = item.querySelector('p');
        
        if (!label) return;
        
        const labelText = label.textContent.toLowerCase();
        const descText = description ? description.textContent.toLowerCase() : '';
        
        if (labelText.includes(term) || descText.includes(term)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Hide/show categories based on visible items
    categories.forEach(category => {
        const visibleItems = category.querySelectorAll('.estilo-item[style=""], .estilo-item:not([style*="display: none"])');
        if (term === '' || visibleItems.length > 0) {
            category.style.display = '';
        } else {
            category.style.display = 'none';
        }
    });
    
    // If search is empty, show all items and categories
    if (term === '') {
        allItems.forEach(item => {
            item.style.display = '';
        });
        categories.forEach(category => {
            category.style.display = '';
        });
    }
}

function saveEstilosMusicais() {
    const selectedStyles = [];
    const activeTab = document.querySelector('.estilos-tab.active')?.textContent.trim() || 'Padrão';
    
    // Collect all checked styles in the current visible tab
    const visibleContent = document.querySelector('.estilos-tab-content:not(.hidden)');
    if (visibleContent) {
        const checkboxes = visibleContent.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(cb => {
            const label = visibleContent.querySelector(`label[for="${cb.id}"]`);
            if (label) {
                selectedStyles.push(label.textContent.trim());
            }
        });
    }
    
    if (selectedStyles.length === 0) {
        showToast(`⚠️ Selecione pelo menos um estilo musical para ${activeTab}`, 'error');
        return;
    }
    
    showToast(`✓ ${selectedStyles.length} estilo(s) salvos para ${activeTab}!`, 'success');
    closeDrawer('estilosMusicais');
}
