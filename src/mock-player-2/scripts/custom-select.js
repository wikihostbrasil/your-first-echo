// Custom Select functionality with smart positioning
function initCustomSelects() {
    const customSelects = document.querySelectorAll('.custom-select');
    
    customSelects.forEach(select => {
        if (select.dataset && select.dataset.initialized === 'true') return;
        if (select.dataset) select.dataset.initialized = 'true';

        const trigger = select.querySelector('.custom-select-trigger');
        const dropdown = select.querySelector('.custom-select-dropdown');
        const searchInput = select.querySelector('.custom-select-search-input');
        const options = select.querySelectorAll('.custom-select-option');

        if (!trigger || !dropdown || !searchInput || !options.length) return;
        
        // Toggle dropdown with smart positioning
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();

            // Close other selects
            document.querySelectorAll('.custom-select.active').forEach(s => {
                if (s !== select) {
                    s.classList.remove('active');
                    const otherDropdown = s.querySelector('.custom-select-dropdown');
                    if (otherDropdown) otherDropdown.style.display = 'none';
                    
                    // Remove contrast from other drawers
                    const otherDrawer = s.closest('[id^="drawer"]');
                    if (otherDrawer) {
                        const otherDrawerContent = otherDrawer.querySelector('.overflow-y-auto');
                        if (otherDrawerContent) {
                            otherDrawerContent.classList.remove('select-active');
                        }
                    }
                }
            });

            const wasActive = select.classList.contains('active');
            select.classList.toggle('active');
            
            if (!wasActive) {
                // Add contrast to drawer when select is active
                const drawer = select.closest('[id^="drawer"]');
                if (drawer) {
                    const drawerContent = drawer.querySelector('.overflow-y-auto');
                    if (drawerContent) {
                        drawerContent.classList.add('drawer-content', 'select-active');
                    }
                }
                
                // Position dropdown using fixed positioning
                const rect = trigger.getBoundingClientRect();
                const dropdownHeight = 320;
                const spaceBelow = window.innerHeight - rect.bottom;
                const spaceAbove = rect.top;
                
                // Set dropdown width to match trigger
                dropdown.style.width = rect.width + 'px';
                dropdown.style.left = rect.left + 'px';
                
                // Decide if dropdown should open upward or downward
                if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
                    // Open upward
                    dropdown.style.top = 'auto';
                    dropdown.style.bottom = (window.innerHeight - rect.top + 8) + 'px';
                    select.classList.add('dropdown-up');
                } else {
                    // Open downward
                    dropdown.style.top = (rect.bottom + 8) + 'px';
                    dropdown.style.bottom = 'auto';
                    select.classList.remove('dropdown-up');
                }
                
                dropdown.style.display = 'block';
                
                // Scroll into view if needed
                setTimeout(() => {
                    const drawer = select.closest('[id^="drawer"]');
                    if (drawer) {
                        const scrollContainer = drawer.querySelector('.overflow-y-auto');
                        if (scrollContainer) {
                            const selectRect = select.getBoundingClientRect();
                            const containerRect = scrollContainer.getBoundingClientRect();
                            
                            if (selectRect.bottom > containerRect.bottom - 100) {
                                select.scrollIntoView({ 
                                    behavior: 'smooth', 
                                    block: 'center' 
                                });
                            }
                        }
                    }
                }, 50);
                
                searchInput.focus();
            } else {
                // Remove contrast from drawer when select is closed
                const drawer = select.closest('[id^="drawer"]');
                if (drawer) {
                    const drawerContent = drawer.querySelector('.overflow-y-auto');
                    if (drawerContent) {
                        drawerContent.classList.remove('select-active');
                    }
                }
                dropdown.style.display = 'none';
            }
        });

        // Search functionality
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            options.forEach(option => {
                const text = option.textContent?.toLowerCase() || '';
                if (text.includes(searchTerm)) option.classList.remove('hidden');
                else option.classList.add('hidden');
            });
        });

        // Select option
        options.forEach(option => {
            option.addEventListener('click', () => {
                // Update trigger text
                trigger.textContent = option.textContent || '';

                // Mark as selected
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                // Close dropdown
                select.classList.remove('active', 'dropdown-up');
                dropdown.style.display = 'none';

                // Reset search
                searchInput.value = '';
                options.forEach(opt => opt.classList.remove('hidden'));
            });
        });

        // Prevent dropdown from closing when clicking inside
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Reposition on window resize/scroll
        const repositionDropdown = () => {
            if (select.classList.contains('active')) {
                const rect = trigger.getBoundingClientRect();
                dropdown.style.width = rect.width + 'px';
                dropdown.style.left = rect.left + 'px';
                
                const dropdownHeight = 320;
                const spaceBelow = window.innerHeight - rect.bottom;
                const spaceAbove = rect.top;
                
                if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
                    dropdown.style.top = 'auto';
                    dropdown.style.bottom = (window.innerHeight - rect.top + 8) + 'px';
                } else {
                    dropdown.style.top = (rect.bottom + 8) + 'px';
                    dropdown.style.bottom = 'auto';
                }
            }
        };
        
        window.addEventListener('resize', repositionDropdown);
        window.addEventListener('scroll', repositionDropdown, true);
    });
}
