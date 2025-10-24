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
}
