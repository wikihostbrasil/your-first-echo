// Edit file modal state
let currentEditFile = { category: '', originalName: '' };

// Files modal functionality
function openFilesModal(category) {
    const modal = document.getElementById('filesModal');
    const modalTitle = document.getElementById('filesModalTitle');
    const filesTableBody = document.getElementById('filesTableBody');
    const filesCardContainer = document.getElementById('filesCardContainer');
    
    modalTitle.textContent = category.toUpperCase();
    
    const files = filesData[category] || [];
    
    // Clear and populate desktop table
    filesTableBody.innerHTML = '';
    files.forEach(file => {
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50';
        row.innerHTML = `
            <td class="px-4 py-3 text-gray-800 dark:text-white">${file.name}</td>
            <td class="px-4 py-3 text-gray-600 dark:text-gray-300">${file.start}</td>
            <td class="px-4 py-3 text-gray-600 dark:text-gray-300">${file.end}</td>
            <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                    <button onclick="playFile('${file.name}')" class="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"></path>
                        </svg>
                    </button>
                    <button onclick="openEditFileModal('${category}', '${file.name}', '${file.start}', '${file.end}')" class="p-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </button>
                    <button class="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
            </td>
        `;
        filesTableBody.appendChild(row);
    });
    
    // Clear and populate mobile cards
    filesCardContainer.innerHTML = '';
    files.forEach(file => {
        const card = document.createElement('div');
        card.className = 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-lg transition-shadow';
        card.innerHTML = `
            <div class="flex items-start justify-between mb-3">
                <div class="flex-1">
                    <h4 class="font-semibold text-gray-800 dark:text-white mb-2">${file.name}</h4>
                    <div class="space-y-1 text-sm">
                        <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <span class="font-medium">Início:</span>
                            <span>${file.start}</span>
                        </div>
                        <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <span class="font-medium">Vencimento:</span>
                            <span>${file.end}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-600">
                <button onclick="playFile('${file.name}')" class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"></path>
                    </svg>
                    <span class="text-sm font-medium">Play</span>
                </button>
                <button onclick="openEditFileModal('${category}', '${file.name}', '${file.start}', '${file.end}')" class="p-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </button>
                <button class="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </div>
        `;
        filesCardContainer.appendChild(card);
    });
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeFilesModal() {
    const modal = document.getElementById('filesModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Edit file modal functionality
function openEditFileModal(category, name, start, end) {
    const modal = document.getElementById('editFileModal');
    const nameInput = document.getElementById('editFileName');
    const startInput = document.getElementById('editFileStart');
    const endInput = document.getElementById('editFileEnd');
    const indeterminateCheckbox = document.getElementById('editFileIndeterminate');
    
    // Store current file info
    currentEditFile = { category, originalName: name };
    
    // Populate fields
    nameInput.value = name;
    
    // Convert date format from DD/MM/YYYY to YYYY-MM-DD
    const [dayStart, monthStart, yearStart] = start.split('/');
    startInput.value = `${yearStart}-${monthStart}-${dayStart}`;
    
    if (end === 'Indeterminado') {
        endInput.value = '';
        endInput.disabled = true;
        indeterminateCheckbox.checked = true;
    } else {
        const [dayEnd, monthEnd, yearEnd] = end.split('/');
        endInput.value = `${yearEnd}-${monthEnd}-${dayEnd}`;
        endInput.disabled = false;
        indeterminateCheckbox.checked = false;
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeEditFileModal() {
    const modal = document.getElementById('editFileModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    
    // Reset form
    document.getElementById('editFileName').value = '';
    document.getElementById('editFileStart').value = '';
    document.getElementById('editFileEnd').value = '';
    document.getElementById('editFileIndeterminate').checked = false;
    document.getElementById('editFileUpload').value = '';
}

function toggleIndeterminate() {
    const endInput = document.getElementById('editFileEnd');
    const indeterminateCheckbox = document.getElementById('editFileIndeterminate');
    
    if (indeterminateCheckbox.checked) {
        endInput.value = '';
        endInput.disabled = true;
    } else {
        endInput.disabled = false;
    }
}

function saveFileEdit() {
    const nameInput = document.getElementById('editFileName');
    const startInput = document.getElementById('editFileStart');
    const endInput = document.getElementById('editFileEnd');
    const indeterminateCheckbox = document.getElementById('editFileIndeterminate');
    const fileUpload = document.getElementById('editFileUpload');
    
    // Validation
    const name = nameInput.value.trim();
    if (!name || name.length === 0) {
        showToast('⚠️ Nome do áudio é obrigatório', 'error');
        nameInput.focus();
        return;
    }
    
    if (name.length > 100) {
        showToast('⚠️ Nome não pode ter mais de 100 caracteres', 'error');
        nameInput.focus();
        return;
    }
    
    if (!startInput.value) {
        showToast('⚠️ Data de início é obrigatória', 'error');
        startInput.focus();
        return;
    }
    
    if (!indeterminateCheckbox.checked && !endInput.value) {
        showToast('⚠️ Data de vencimento é obrigatória ou marque como indeterminado', 'error');
        endInput.focus();
        return;
    }
    
    // Check if end date is after start date
    if (!indeterminateCheckbox.checked && endInput.value) {
        const startDate = new Date(startInput.value);
        const endDate = new Date(endInput.value);
        
        if (endDate < startDate) {
            showToast('⚠️ Data de vencimento não pode ser anterior à data de início', 'error');
            endInput.focus();
            return;
        }
    }
    
    // Update the data (in real app, this would be an API call)
    const file = filesData[currentEditFile.category].find(f => f.name === currentEditFile.originalName);
    if (file) {
        file.name = name;
        
        // Convert date format back to DD/MM/YYYY
        const [yearStart, monthStart, dayStart] = startInput.value.split('-');
        file.start = `${dayStart}/${monthStart}/${yearStart}`;
        
        if (indeterminateCheckbox.checked) {
            file.end = 'Indeterminado';
        } else {
            const [yearEnd, monthEnd, dayEnd] = endInput.value.split('-');
            file.end = `${dayEnd}/${monthEnd}/${yearEnd}`;
        }
    }
    
    // Show success message
    if (fileUpload.files.length > 0) {
        showToast(`✓ Anúncio "${name}" atualizado com novo arquivo!`, 'success');
    } else {
        showToast(`✓ Anúncio "${name}" atualizado com sucesso!`, 'success');
    }
    
    // Close modal and refresh the files modal
    closeEditFileModal();
    openFilesModal(currentEditFile.category);
}

// Upload modal functionality
function openUploadModal() {
    const modal = document.getElementById('uploadModal');
    const fileInput = document.getElementById('uploadFile');
    const fileNameDisplay = document.getElementById('uploadFileName');
    
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('uploadStart').value = today;
    document.getElementById('uploadEnd').value = today;
    
    // File input change listener
    fileInput.onchange = function() {
        if (this.files.length > 0) {
            fileNameDisplay.textContent = this.files[0].name;
        } else {
            fileNameDisplay.textContent = 'Nenhum arquivo escolhido';
        }
    };
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeUploadModal() {
    const modal = document.getElementById('uploadModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    
    // Reset form
    document.getElementById('uploadRadio').value = 'Exemplo 1';
    document.getElementById('uploadName').value = '';
    document.getElementById('uploadCategory').value = 'promocionais';
    document.getElementById('uploadStart').value = '';
    document.getElementById('uploadEnd').value = '';
    document.getElementById('uploadIndeterminate').checked = false;
    document.getElementById('uploadEnd').disabled = false;
    document.getElementById('uploadFile').value = '';
    document.getElementById('uploadFileName').textContent = 'Nenhum arquivo escolhido';
}

function toggleIndeterminateUpload() {
    const endInput = document.getElementById('uploadEnd');
    const indeterminateCheckbox = document.getElementById('uploadIndeterminate');
    
    if (indeterminateCheckbox.checked) {
        endInput.value = '';
        endInput.disabled = true;
    } else {
        endInput.disabled = false;
    }
}

function saveUpload() {
    const radioInput = document.getElementById('uploadRadio');
    const nameInput = document.getElementById('uploadName');
    const categorySelect = document.getElementById('uploadCategory');
    const startInput = document.getElementById('uploadStart');
    const endInput = document.getElementById('uploadEnd');
    const indeterminateCheckbox = document.getElementById('uploadIndeterminate');
    const fileInput = document.getElementById('uploadFile');
    
    // Validation
    const radio = radioInput.value.trim();
    if (!radio || radio.length === 0) {
        showToast('⚠️ Campo Rádio é obrigatório', 'error');
        radioInput.focus();
        return;
    }
    
    if (!startInput.value) {
        showToast('⚠️ Data de início é obrigatória', 'error');
        startInput.focus();
        return;
    }
    
    if (!indeterminateCheckbox.checked && !endInput.value) {
        showToast('⚠️ Data de vencimento é obrigatória ou marque como indeterminado', 'error');
        endInput.focus();
        return;
    }
    
    // Check if end date is after start date
    if (!indeterminateCheckbox.checked && endInput.value) {
        const startDate = new Date(startInput.value);
        const endDate = new Date(endInput.value);
        
        if (endDate < startDate) {
            showToast('⚠️ Data de vencimento não pode ser anterior à data de início', 'error');
            endInput.focus();
            return;
        }
    }
    
    if (fileInput.files.length === 0) {
        showToast('⚠️ Selecione um arquivo .mp3', 'error');
        return;
    }
    
    // Check file type
    const file = fileInput.files[0];
    if (!file.name.toLowerCase().endsWith('.mp3')) {
        showToast('⚠️ Apenas arquivos .mp3 são permitidos', 'error');
        return;
    }
    
    // Convert date format to DD/MM/YYYY
    const [yearStart, monthStart, dayStart] = startInput.value.split('-');
    const startFormatted = `${dayStart}/${monthStart}/${yearStart}`;
    
    let endFormatted = 'Indeterminado';
    if (!indeterminateCheckbox.checked) {
        const [yearEnd, monthEnd, dayEnd] = endInput.value.split('-');
        endFormatted = `${dayEnd}/${monthEnd}/${yearEnd}`;
    }
    
    // Add to data (in real app, this would be an API call)
    const category = categorySelect.value;
    const audioName = nameInput.value.trim() || file.name.replace('.mp3', '');
    
    if (!filesData[category]) {
        filesData[category] = [];
    }
    
    filesData[category].push({
        name: audioName,
        start: startFormatted,
        end: endFormatted
    });
    
    // Show success message
    showToast(`✓ Anúncio "${audioName}" enviado com sucesso!`, 'success');
    
    // Close modal
    closeUploadModal();
}

// ===== MODAL DE SUGESTÃO =====
function openSugestaoModal() {
  document.getElementById('sugestaoModal').classList.remove('hidden');
  document.getElementById('sugestaoModal').classList.add('flex');
}

function closeSugestaoModal() {
  document.getElementById('sugestaoModal').classList.remove('flex');
  document.getElementById('sugestaoModal').classList.add('hidden');
  
  // Limpar formulário
  document.getElementById('sugestaoRadio').value = '';
  document.getElementById('sugestaoNome').value = '';
  document.getElementById('sugestaoTipo').value = '';
  document.getElementById('sugestaoTexto').value = '';
  document.getElementById('sugestaoObservacoes').value = '';
}

function saveSugestao() {
  const radio = document.getElementById('sugestaoRadio').value.trim();
  const tipo = document.getElementById('sugestaoTipo').value;
  const texto = document.getElementById('sugestaoTexto').value.trim();

  // Validações
  if (!radio) {
    showToast('Por favor, informe a rádio', 'error');
    return;
  }

  if (!tipo) {
    showToast('Por favor, selecione o tipo de sugestão', 'error');
    return;
  }

  if (!texto) {
    showToast('Por favor, digite sua sugestão', 'error');
    return;
  }

  // Simular salvamento
  console.log('Sugestão salva:', {
    radio,
    nome: document.getElementById('sugestaoNome').value.trim(),
    tipo,
    texto,
    observacoes: document.getElementById('sugestaoObservacoes').value.trim()
  });

  showToast('✓ Sugestão enviada com sucesso!', 'success');
  closeSugestaoModal();
}

// ===== MODAL DE DADOS CADASTRAIS =====
function openDadosCadastraisModal() {
  document.getElementById('dadosCadastraisModal').classList.remove('hidden');
  document.getElementById('dadosCadastraisModal').classList.add('flex');
}

function closeDadosCadastraisModal() {
  document.getElementById('dadosCadastraisModal').classList.remove('flex');
  document.getElementById('dadosCadastraisModal').classList.add('hidden');
  
  // Limpar formulário
  document.getElementById('perfilNome').value = '';
  document.getElementById('perfilEmail').value = '';
  document.getElementById('perfilTelefone').value = '';
  document.getElementById('perfilRadio').value = '';
  document.getElementById('perfilCidade').value = '';
  document.getElementById('perfilEstado').value = '';
}

function saveDadosCadastrais() {
  const nome = document.getElementById('perfilNome').value.trim();
  const email = document.getElementById('perfilEmail').value.trim();
  const radio = document.getElementById('perfilRadio').value.trim();

  // Validações
  if (!nome) {
    showToast('Por favor, informe seu nome completo', 'error');
    return;
  }

  if (!email) {
    showToast('Por favor, informe seu e-mail', 'error');
    return;
  }

  // Validação básica de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Por favor, informe um e-mail válido', 'error');
    return;
  }

  if (!radio) {
    showToast('Por favor, informe o nome da rádio', 'error');
    return;
  }

  // Simular salvamento
  console.log('Dados cadastrais salvos:', {
    nome,
    email,
    telefone: document.getElementById('perfilTelefone').value.trim(),
    radio,
    cidade: document.getElementById('perfilCidade').value.trim(),
    estado: document.getElementById('perfilEstado').value
  });

  showToast('✓ Dados cadastrais atualizados com sucesso!', 'success');
  closeDadosCadastraisModal();
}

// ===== MODAL DE ALTERAR SENHA =====
function openAlterarSenhaModal() {
  document.getElementById('alterarSenhaModal').classList.remove('hidden');
  document.getElementById('alterarSenhaModal').classList.add('flex');
}

function closeAlterarSenhaModal() {
  document.getElementById('alterarSenhaModal').classList.remove('flex');
  document.getElementById('alterarSenhaModal').classList.add('hidden');
  
  // Limpar formulário
  document.getElementById('senhaAtual').value = '';
  document.getElementById('senhaNova').value = '';
  document.getElementById('senhaConfirmar').value = '';
}

function saveAlterarSenha() {
  const senhaAtual = document.getElementById('senhaAtual').value;
  const senhaNova = document.getElementById('senhaNova').value;
  const senhaConfirmar = document.getElementById('senhaConfirmar').value;

  // Validações
  if (!senhaAtual) {
    showToast('Por favor, informe sua senha atual', 'error');
    return;
  }

  if (!senhaNova) {
    showToast('Por favor, informe a nova senha', 'error');
    return;
  }

  if (senhaNova.length < 8) {
    showToast('A nova senha deve ter no mínimo 8 caracteres', 'error');
    return;
  }

  if (senhaNova !== senhaConfirmar) {
    showToast('As senhas não conferem', 'error');
    return;
  }

  // Simular salvamento
  console.log('Senha alterada com sucesso');

  showToast('✓ Senha alterada com sucesso!', 'success');
  closeAlterarSenhaModal();
}

// ===== MODAL DE ALTERAR LOGO =====
function openAlterarLogoModal() {
  const modal = document.getElementById('alterarLogoModal');
  const fileInput = document.getElementById('logoFile');
  const fileNameDisplay = document.getElementById('logoFileName');
  const logoPreview = document.getElementById('logoPreview');
  
  // File input change listener
  fileInput.onchange = function() {
    if (this.files.length > 0) {
      const file = this.files[0];
      fileNameDisplay.textContent = file.name;
      
      // Preview da imagem
      const reader = new FileReader();
      reader.onload = function(e) {
        logoPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      fileNameDisplay.textContent = 'Nenhum arquivo escolhido';
    }
  };
  
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeAlterarLogoModal() {
  document.getElementById('alterarLogoModal').classList.remove('flex');
  document.getElementById('alterarLogoModal').classList.add('hidden');
  
  // Limpar formulário
  document.getElementById('logoFile').value = '';
  document.getElementById('logoFileName').textContent = 'Nenhum arquivo escolhido';
  document.getElementById('logoPreview').src = 'https://placehold.co/128x128/0066FF/FFFFFF?text=LOGO';
}

function saveAlterarLogo() {
  const fileInput = document.getElementById('logoFile');
  
  if (fileInput.files.length === 0) {
    showToast('⚠️ Selecione uma imagem', 'error');
    return;
  }
  
  const file = fileInput.files[0];
  
  // Validar tipo de arquivo
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    showToast('⚠️ Formato inválido. Use JPG, PNG ou GIF', 'error');
    return;
  }
  
  // Validar tamanho (2MB)
  if (file.size > 2 * 1024 * 1024) {
    showToast('⚠️ Imagem muito grande. Máximo 2MB', 'error');
    return;
  }
  
  // Atualizar logo principal
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('mainLogo').src = e.target.result;
  };
  reader.readAsDataURL(file);
  
  showToast('✓ Logo atualizada com sucesso!', 'success');
  closeAlterarLogoModal();
}

// Inject profile modals into DOM on page load
if (typeof document !== 'undefined') {
  const modalsHTML = `
  <div id="dadosCadastraisModal" class="fixed inset-0 bg-black bg-opacity-50 z-[99999] hidden items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-3">
          <svg class="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Dados Cadastrais</h2>
        </div>
        <button onclick="closeDadosCadastraisModal()" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
      </div>
      <div class="p-6 space-y-4">
        <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Nome Completo: <span class="text-red-500">*</span></label><input type="text" id="perfilNome" placeholder="Digite seu nome completo" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"></div>
        <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">E-mail: <span class="text-red-500">*</span></label><input type="email" id="perfilEmail" placeholder="seu@email.com" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"></div>
        <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Telefone:</label><input type="tel" id="perfilTelefone" placeholder="(00) 00000-0000" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"></div>
        <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Nome da Rádio: <span class="text-red-500">*</span></label><input type="text" id="perfilRadio" placeholder="Ex: Rádio Mix FM" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"></div>
      </div>
      <div class="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700"><button onclick="closeDadosCadastraisModal()" class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200">Cancelar</button><button onclick="saveDadosCadastrais()" class="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition-colors duration-200">Salvar</button></div>
    </div>
  </div>
  <div id="alterarSenhaModal" class="fixed inset-0 bg-black bg-opacity-50 z-[99999] hidden items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-3"><svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg><h2 class="text-2xl font-bold text-gray-800 dark:text-white">Alterar Senha</h2></div>
        <button onclick="closeAlterarSenhaModal()" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
      </div>
      <div class="p-6 space-y-4">
        <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Senha Atual: <span class="text-red-500">*</span></label><input type="password" id="senhaAtual" placeholder="Digite sua senha atual" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"></div>
        <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Nova Senha: <span class="text-red-500">*</span></label><input type="password" id="senhaNova" placeholder="Digite a nova senha" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"></div>
        <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Confirmar: <span class="text-red-500">*</span></label><input type="password" id="senhaConfirmar" placeholder="Confirme a nova senha" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"></div>
      </div>
      <div class="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700"><button onclick="closeAlterarSenhaModal()" class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200">Cancelar</button><button onclick="saveAlterarSenha()" class="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors duration-200">Salvar</button></div>
    </div>
  </div>
  <div id="alterarLogoModal" class="fixed inset-0 bg-black bg-opacity-50 z-[99999] hidden items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-3"><svg class="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><h2 class="text-2xl font-bold text-gray-800 dark:text-white">Alterar Logo</h2></div>
        <button onclick="closeAlterarLogoModal()" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
      </div>
      <div class="p-6 space-y-4">
        <div class="flex flex-col items-center"><label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Logo Atual:</label><div class="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg overflow-hidden"><img id="logoPreview" src="https://placehold.co/128x128/0066FF/FFFFFF?text=LOGO" alt="Logo" class="w-24 h-24 object-contain rounded-full"></div></div>
        <div><label for="logoFile" class="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg cursor-pointer transition-all duration-200 font-medium text-center flex items-center justify-center gap-2">Escolher Imagem</label><input type="file" id="logoFile" accept="image/*" class="hidden"><span id="logoFileName" class="text-sm text-gray-500 dark:text-gray-400 block text-center mt-2">Nenhum arquivo escolhido</span></div>
      </div>
      <div class="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700"><button onclick="closeAlterarLogoModal()" class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200">Cancelar</button><button onclick="saveAlterarLogo()" class="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors duration-200">Salvar</button></div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', modalsHTML);
  
  // Add reports modals
  const reportsModalsHTML = `
  <!-- Modal de Programação -->
  <div id="programacaoModal" class="fixed inset-0 bg-black bg-opacity-50 z-[99999] hidden items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-3">
          <svg class="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Relatório de Programação</h2>
        </div>
        <button onclick="closeProgramacaoModal()" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
      </div>
      <div class="p-6">
        <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Data Início:</label><input type="date" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"></div>
          <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Data Fim:</label><input type="date" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"></div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
          <p class="text-gray-600 dark:text-gray-400">Selecione o período para gerar o relatório de programação</p>
        </div>
      </div>
      <div class="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
        <button onclick="closeProgramacaoModal()" class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200">Fechar</button>
        <button class="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors duration-200">Gerar Relatório</button>
      </div>
    </div>
  </div>

  <!-- Modal de Relatório de Pedidos -->
  <div id="relatorioPedidosModal" class="fixed inset-0 bg-black bg-opacity-50 z-[99999] hidden items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-3">
          <svg class="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Relatório de Pedidos</h2>
        </div>
        <button onclick="closeRelatorioPedidosModal()" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
      </div>
      <div class="p-6">
        <div class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Data Início:</label><input type="date" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"></div>
          <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Data Fim:</label><input type="date" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"></div>
          <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Status:</label><select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"><option value="">Todos</option><option value="pendente">Pendente</option><option value="aprovado">Aprovado</option><option value="concluido">Concluído</option></select></div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
          <p class="text-gray-600 dark:text-gray-400">Selecione o período e status para gerar o relatório de pedidos</p>
        </div>
      </div>
      <div class="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
        <button onclick="closeRelatorioPedidosModal()" class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200">Fechar</button>
        <button class="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors duration-200">Gerar Relatório</button>
      </div>
    </div>
  </div>

  <!-- Modal de Faturas -->
  <div id="faturasModal" class="fixed inset-0 bg-black bg-opacity-50 z-[99999] hidden items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-3">
          <svg class="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Relatório de Faturas</h2>
        </div>
        <button onclick="closeFaturasModal()" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
      </div>
      <div class="p-6">
        <div class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Mês/Ano:</label><input type="month" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"></div>
          <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Status:</label><select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"><option value="">Todas</option><option value="paga">Paga</option><option value="pendente">Pendente</option><option value="vencida">Vencida</option></select></div>
          <div><label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Tipo:</label><select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"><option value="">Todos</option><option value="mensal">Mensalidade</option><option value="adicional">Adicional</option></select></div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
          <p class="text-gray-600 dark:text-gray-400">Selecione os filtros para gerar o relatório de faturas</p>
        </div>
      </div>
      <div class="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
        <button onclick="closeFaturasModal()" class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200">Fechar</button>
        <button class="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg transition-colors duration-200">Gerar Relatório</button>
      </div>
    </div>
  </div>
  
  <!-- Modal de Anúncios Agendados -->
  <div id="agendamentosModal" class="fixed inset-0 bg-black bg-opacity-50 z-[99999] hidden items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-3">
          <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Anúncios Agendados</h2>
        </div>
        <button onclick="closeAgendamentosModal()" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <!-- Search Bar -->
        <div class="mb-6">
          <div class="relative">
            <input 
              type="text" 
              id="agendamentosSearch" 
              placeholder="Buscar por arquivo ou categoria..." 
              class="w-full px-4 py-3 pl-11 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onkeyup="filterAgendamentos()"
            >
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
        
        <!-- Desktop Table -->
        <div class="hidden md:block overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Arquivo</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Categoria</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Data Início</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Data Fim</th>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Ações</th>
              </tr>
            </thead>
            <tbody id="agendamentosTableBody"></tbody>
          </table>
        </div>
        
        <!-- Mobile Cards -->
        <div id="agendamentosCardsContainer" class="md:hidden space-y-4"></div>
        
        <!-- No Results Message -->
        <div id="agendamentosNoResults" class="hidden text-center py-8">
          <svg class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-gray-500 dark:text-gray-400 text-lg">Nenhum agendamento encontrado</p>
        </div>
        
        <!-- Pagination -->
        <div id="agendamentosPagination" class="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Mostrando <span id="agendamentosShowingStart">0</span> - <span id="agendamentosShowingEnd">0</span> de <span id="agendamentosTotal">0</span> agendamentos
          </div>
          <div class="flex items-center gap-2">
            <button 
              id="agendamentosPrevBtn" 
              onclick="previousPageAgendamentos()" 
              class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <div id="agendamentosPageNumbers" class="flex items-center gap-1"></div>
            <button 
              id="agendamentosNextBtn" 
              onclick="nextPageAgendamentos()" 
              class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div class="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
        <button onclick="closeAgendamentosModal()" class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200">Fechar</button>
        <button onclick="closeAgendamentosModal(); openAgendarAnuncioModal();" class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Adicionar
        </button>
      </div>
    </div>
  </div>
  
  <!-- Modal de Agendar Anúncio -->
  <div id="agendarAnuncioModal" class="fixed inset-0 bg-black bg-opacity-50 z-[99999] hidden items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-3">
          <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Agendar Anúncio</h2>
        </div>
        <button onclick="closeAgendarAnuncioModal()" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="p-6 space-y-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Descrição: <span class="text-red-500">*</span></label>
          <input type="text" id="agendarDescricao" placeholder="Ex: Promoção de Verão" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Mídia: <span class="text-red-500">*</span></label>
          <select id="agendarMidia" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Selecione...</option>
            <option value="promocional">Promocional</option>
            <option value="institucional">Institucional</option>
            <option value="vinheta">Vinheta</option>
            <option value="geral">Aviso Geral</option>
          </select>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Data Início: <span class="text-red-500">*</span></label>
            <input type="date" id="agendarDataInicio" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Data Fim: <span class="text-red-500">*</span></label>
            <input type="date" id="agendarDataFim" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Horário Início: <span class="text-red-500">*</span></label>
            <input type="time" id="agendarHorarioInicio" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Horário Fim: <span class="text-red-500">*</span></label>
            <input type="time" id="agendarHorarioFim" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Dias da Semana: <span class="text-red-500">*</span></label>
          <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="diaSeg" class="w-4 h-4 text-blue-500 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500">
              <span class="text-sm text-gray-700 dark:text-gray-200">Seg</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="diaTer" class="w-4 h-4 text-blue-500 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500">
              <span class="text-sm text-gray-700 dark:text-gray-200">Ter</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="diaQua" class="w-4 h-4 text-blue-500 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500">
              <span class="text-sm text-gray-700 dark:text-gray-200">Qua</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="diaQui" class="w-4 h-4 text-blue-500 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500">
              <span class="text-sm text-gray-700 dark:text-gray-200">Qui</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="diaSex" class="w-4 h-4 text-blue-500 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500">
              <span class="text-sm text-gray-700 dark:text-gray-200">Sex</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="diaSab" class="w-4 h-4 text-blue-500 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500">
              <span class="text-sm text-gray-700 dark:text-gray-200">Sáb</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="diaDom" class="w-4 h-4 text-blue-500 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500">
              <span class="text-sm text-gray-700 dark:text-gray-200">Dom</span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
        <button onclick="closeAgendarAnuncioModal()" class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200">Cancelar</button>
        <button onclick="saveAgendamento()" class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Salvar
        </button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', reportsModalsHTML);
}

// ===== MODAL DE PROGRAMAÇÃO =====
function openProgramacaoModal() {
  document.getElementById('programacaoModal').classList.remove('hidden');
  document.getElementById('programacaoModal').classList.add('flex');
}

function closeProgramacaoModal() {
  document.getElementById('programacaoModal').classList.remove('flex');
  document.getElementById('programacaoModal').classList.add('hidden');
}

// ===== MODAL DE RELATÓRIO DE PEDIDOS =====
function openRelatorioPedidosModal() {
  document.getElementById('relatorioPedidosModal').classList.remove('hidden');
  document.getElementById('relatorioPedidosModal').classList.add('flex');
}

function closeRelatorioPedidosModal() {
  document.getElementById('relatorioPedidosModal').classList.remove('flex');
  document.getElementById('relatorioPedidosModal').classList.add('hidden');
}

// ===== MODAL DE FATURAS =====
function openFaturasModal() {
  document.getElementById('faturasModal').classList.remove('hidden');
  document.getElementById('faturasModal').classList.add('flex');
}

function closeFaturasModal() {
  document.getElementById('faturasModal').classList.remove('flex');
  document.getElementById('faturasModal').classList.add('hidden');
}

// ===== MODAL DE ANÚNCIOS AGENDADOS =====
const agendamentosData = [
  { id: 1, arquivo: 'Anúncio Promoção Verão', categoria: 'Promocional', dataInicio: '01/11/2024', dataFim: '31/12/2024' },
  { id: 2, arquivo: 'Institucional Rádio', categoria: 'Institucional', dataInicio: '15/10/2024', dataFim: 'Indeterminado' },
  { id: 3, arquivo: 'Black Friday 2024', categoria: 'Promocional', dataInicio: '20/11/2024', dataFim: '30/11/2024' },
  { id: 4, arquivo: 'Natal Mix FM', categoria: 'Institucional', dataInicio: '01/12/2024', dataFim: '25/12/2024' },
  { id: 5, arquivo: 'Ano Novo', categoria: 'Vinheta', dataInicio: '26/12/2024', dataFim: '02/01/2025' },
  { id: 6, arquivo: 'Ofertas Semanais', categoria: 'Promocional', dataInicio: '01/11/2024', dataFim: 'Indeterminado' },
  { id: 7, arquivo: 'Institucional Empresa X', categoria: 'Institucional', dataInicio: '10/10/2024', dataFim: '10/12/2024' },
  { id: 8, arquivo: 'Verão 2025', categoria: 'Promocional', dataInicio: '01/01/2025', dataFim: '31/03/2025' },
  { id: 9, arquivo: 'Avisos Gerais', categoria: 'Aviso Geral', dataInicio: '01/11/2024', dataFim: 'Indeterminado' },
  { id: 10, arquivo: 'Carnaval 2025', categoria: 'Vinheta', dataInicio: '01/02/2025', dataFim: '28/02/2025' },
  { id: 11, arquivo: 'Páscoa 2025', categoria: 'Promocional', dataInicio: '01/04/2025', dataFim: '20/04/2025' },
  { id: 12, arquivo: 'Dia das Mães', categoria: 'Promocional', dataInicio: '01/05/2025', dataFim: '12/05/2025' }
];

let agendamentosCurrentPage = 1;
const agendamentosPerPage = 10;
let agendamentosSearchTerm = '';

function filterAgendamentos() {
  agendamentosSearchTerm = document.getElementById('agendamentosSearch').value.toLowerCase();
  agendamentosCurrentPage = 1; // Reset to first page when searching
  renderAgendamentos();
}

function getFilteredAgendamentos() {
  if (!agendamentosSearchTerm) return agendamentosData;
  
  return agendamentosData.filter(item => 
    item.arquivo.toLowerCase().includes(agendamentosSearchTerm) ||
    item.categoria.toLowerCase().includes(agendamentosSearchTerm)
  );
}

function renderAgendamentos() {
  const filteredData = getFilteredAgendamentos();
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / agendamentosPerPage);
  const startIndex = (agendamentosCurrentPage - 1) * agendamentosPerPage;
  const endIndex = Math.min(startIndex + agendamentosPerPage, totalItems);
  const currentPageData = filteredData.slice(startIndex, endIndex);
  
  const tbody = document.getElementById('agendamentosTableBody');
  const cardsContainer = document.getElementById('agendamentosCardsContainer');
  const noResults = document.getElementById('agendamentosNoResults');
  const pagination = document.getElementById('agendamentosPagination');
  
  // Clear existing content
  tbody.innerHTML = '';
  cardsContainer.innerHTML = '';
  
  // Show/hide no results message
  if (currentPageData.length === 0) {
    noResults.classList.remove('hidden');
    pagination.classList.add('hidden');
    return;
  } else {
    noResults.classList.add('hidden');
    pagination.classList.remove('hidden');
  }
  
  // Populate desktop table
  currentPageData.forEach(item => {
    const row = document.createElement('tr');
    row.className = 'border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50';
    row.innerHTML = `
      <td class="px-4 py-3 text-gray-800 dark:text-white">${item.arquivo}</td>
      <td class="px-4 py-3 text-gray-600 dark:text-gray-300">${item.categoria}</td>
      <td class="px-4 py-3 text-gray-600 dark:text-gray-300">${item.dataInicio}</td>
      <td class="px-4 py-3 text-gray-600 dark:text-gray-300">${item.dataFim}</td>
      <td class="px-4 py-3">
        <div class="flex items-center gap-2">
          <button onclick="editAgendamento(${item.id})" class="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>
          <button onclick="deleteAgendamento(${item.id})" class="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
  
  // Populate mobile cards
  currentPageData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-lg transition-shadow';
    card.innerHTML = `
      <div class="flex items-start justify-between mb-3">
        <div class="flex-1">
          <h4 class="font-semibold text-gray-800 dark:text-white mb-2">${item.arquivo}</h4>
          <div class="space-y-1 text-sm">
            <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span class="font-medium">Categoria:</span>
              <span>${item.categoria}</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span class="font-medium">Início:</span>
              <span>${item.dataInicio}</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <span class="font-medium">Fim:</span>
              <span>${item.dataFim}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-600">
        <button onclick="editAgendamento(${item.id})" class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
          <span class="text-sm font-medium">Editar</span>
        </button>
        <button onclick="deleteAgendamento(${item.id})" class="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
    `;
    cardsContainer.appendChild(card);
  });
  
  // Update pagination info
  document.getElementById('agendamentosShowingStart').textContent = totalItems > 0 ? startIndex + 1 : 0;
  document.getElementById('agendamentosShowingEnd').textContent = endIndex;
  document.getElementById('agendamentosTotal').textContent = totalItems;
  
  // Update pagination buttons
  const prevBtn = document.getElementById('agendamentosPrevBtn');
  const nextBtn = document.getElementById('agendamentosNextBtn');
  prevBtn.disabled = agendamentosCurrentPage === 1;
  nextBtn.disabled = agendamentosCurrentPage === totalPages || totalPages === 0;
  
  // Render page numbers
  renderPageNumbers(totalPages);
}

function renderPageNumbers(totalPages) {
  const pageNumbersContainer = document.getElementById('agendamentosPageNumbers');
  pageNumbersContainer.innerHTML = '';
  
  if (totalPages <= 1) return;
  
  const maxVisiblePages = 5;
  let startPage = Math.max(1, agendamentosCurrentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  // Adjust if we're near the end
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.textContent = i;
    pageBtn.className = `px-3 py-2 rounded-lg transition-colors ${
      i === agendamentosCurrentPage
        ? 'bg-blue-500 text-white font-semibold'
        : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
    }`;
    pageBtn.onclick = () => goToPageAgendamentos(i);
    pageNumbersContainer.appendChild(pageBtn);
  }
}

function goToPageAgendamentos(page) {
  agendamentosCurrentPage = page;
  renderAgendamentos();
}

function previousPageAgendamentos() {
  if (agendamentosCurrentPage > 1) {
    agendamentosCurrentPage--;
    renderAgendamentos();
  }
}

function nextPageAgendamentos() {
  const filteredData = getFilteredAgendamentos();
  const totalPages = Math.ceil(filteredData.length / agendamentosPerPage);
  if (agendamentosCurrentPage < totalPages) {
    agendamentosCurrentPage++;
    renderAgendamentos();
  }
}

function openAgendamentosModal() {
  const modal = document.getElementById('agendamentosModal');
  
  // Reset search
  document.getElementById('agendamentosSearch').value = '';
  agendamentosSearchTerm = '';
  agendamentosCurrentPage = 1;
  
  // Render the list
  renderAgendamentos();
  
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeAgendamentosModal() {
  document.getElementById('agendamentosModal').classList.remove('flex');
  document.getElementById('agendamentosModal').classList.add('hidden');
}

function openAgendarAnuncioModal() {
  const modal = document.getElementById('agendarAnuncioModal');
  
  // Set default dates
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('agendarDataInicio').value = today;
  document.getElementById('agendarDataFim').value = today;
  
  // Initialize checkboxes
  ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'].forEach(day => {
    document.getElementById(`dia${day.charAt(0).toUpperCase() + day.slice(1)}`).checked = false;
  });
  
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeAgendarAnuncioModal() {
  const modal = document.getElementById('agendarAnuncioModal');
  modal.classList.remove('flex');
  modal.classList.add('hidden');
  
  // Reset form
  document.getElementById('agendarDescricao').value = '';
  document.getElementById('agendarMidia').value = '';
  document.getElementById('agendarDataInicio').value = '';
  document.getElementById('agendarDataFim').value = '';
  document.getElementById('agendarHorarioInicio').value = '';
  document.getElementById('agendarHorarioFim').value = '';
  ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'].forEach(day => {
    document.getElementById(`dia${day.charAt(0).toUpperCase() + day.slice(1)}`).checked = false;
  });
}

function saveAgendamento() {
  const descricao = document.getElementById('agendarDescricao').value.trim();
  const midia = document.getElementById('agendarMidia').value;
  const dataInicio = document.getElementById('agendarDataInicio').value;
  const dataFim = document.getElementById('agendarDataFim').value;
  const horarioInicio = document.getElementById('agendarHorarioInicio').value;
  const horarioFim = document.getElementById('agendarHorarioFim').value;
  
  // Validation
  if (!descricao) {
    showToast('⚠️ Descrição é obrigatória', 'error');
    return;
  }
  
  if (!midia) {
    showToast('⚠️ Selecione uma mídia', 'error');
    return;
  }
  
  if (!dataInicio || !dataFim) {
    showToast('⚠️ Datas de início e fim são obrigatórias', 'error');
    return;
  }
  
  if (new Date(dataFim) < new Date(dataInicio)) {
    showToast('⚠️ Data fim não pode ser anterior à data início', 'error');
    return;
  }
  
  if (!horarioInicio || !horarioFim) {
    showToast('⚠️ Horários são obrigatórios', 'error');
    return;
  }
  
  // Check if at least one day is selected
  const diasSelecionados = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'].filter(day => 
    document.getElementById(`dia${day.charAt(0).toUpperCase() + day.slice(1)}`).checked
  );
  
  if (diasSelecionados.length === 0) {
    showToast('⚠️ Selecione pelo menos um dia da semana', 'error');
    return;
  }
  
  // Save (in real app, this would be an API call)
  console.log('Agendamento salvo:', {
    descricao,
    midia,
    dataInicio,
    dataFim,
    horarioInicio,
    horarioFim,
    dias: diasSelecionados
  });
  
  showToast('✓ Agendamento salvo com sucesso!', 'success');
  closeAgendarAnuncioModal();
}

function editAgendamento(id) {
  const agendamento = agendamentosData.find(a => a.id === id);
  if (!agendamento) return;
  
  showToast(`Editando: ${agendamento.arquivo}`, 'info');
  openAgendarAnuncioModal();
}

function deleteAgendamento(id) {
  const agendamento = agendamentosData.find(a => a.id === id);
  if (!agendamento) return;
  
  if (confirm(`Tem certeza que deseja excluir "${agendamento.arquivo}"?`)) {
    const index = agendamentosData.findIndex(a => a.id === id);
    if (index > -1) {
      agendamentosData.splice(index, 1);
      showToast('✓ Agendamento excluído com sucesso!', 'success');
      renderAgendamentos(); // Refresh the list
    }
  }
}
