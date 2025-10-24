// Pedidos Wizard Management
let currentPedidoStep = 1;
let pedidoData = {};

function openPedidosModal() {
  document.getElementById('pedidosModal').style.display = 'flex';
  currentPedidoStep = 1;
  pedidoData = {};
  updatePedidosStepDisplay();
  
  // Set default dates
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  document.getElementById('pedidoDataInicio').value = today;
  document.getElementById('pedidoDataVencimento').value = tomorrow;
}

function closePedidosModal() {
  document.getElementById('pedidosModal').style.display = 'none';
  currentPedidoStep = 1;
  resetPedidosForm();
}

function resetPedidosForm() {
  document.getElementById('pedidoResponsavel').value = '';
  document.getElementById('pedidoDataInicio').value = '';
  document.getElementById('pedidoDataVencimento').value = '';
  document.getElementById('pedidoIncluirEm').value = 'programacao-principal';
  document.getElementById('pedidoArquivo').value = '';
  document.getElementById('pedidoDescricao').value = '';
  document.getElementById('pedidoGravarComoEsta').checked = true;
  document.getElementById('pedidoFileName').classList.add('hidden');
  pedidoData = {};
}

function updatePedidosStepDisplay() {
  // Hide all steps
  document.getElementById('pedidosStep1').classList.add('hidden');
  document.getElementById('pedidosStep2').classList.add('hidden');
  document.getElementById('pedidosStep3').classList.add('hidden');
  document.getElementById('pedidosLoading').classList.add('hidden');

  // Show current step
  if (currentPedidoStep === 1) {
    document.getElementById('pedidosStep1').classList.remove('hidden');
  } else if (currentPedidoStep === 2) {
    document.getElementById('pedidosStep2').classList.remove('hidden');
  } else if (currentPedidoStep === 3) {
    document.getElementById('pedidosStep3').classList.remove('hidden');
    updateResumo();
  }

  // Update step indicators
  updateStepIndicators();
  
  // Update buttons visibility
  updateButtonsVisibility();
}

function updateStepIndicators() {
  // Reset all indicators
  const indicators = ['step1Indicator', 'step2Indicator', 'step3Indicator'];
  const labels = ['step1Label', 'step2Label', 'step3Label'];
  const connectors = ['connector1', 'connector2'];
  
  indicators.forEach((id, index) => {
    const indicator = document.getElementById(id);
    const label = document.getElementById(labels[index]);
    const stepNum = index + 1;
    
    if (stepNum < currentPedidoStep) {
      // Completed step
      indicator.className = 'w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg mb-2 transition-all';
      label.className = 'text-sm font-medium text-green-600 dark:text-green-400';
    } else if (stepNum === currentPedidoStep) {
      // Current step
      indicator.className = 'w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg mb-2 transition-all';
      label.className = 'text-sm font-medium text-blue-600 dark:text-blue-400';
    } else {
      // Future step
      indicator.className = 'w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 flex items-center justify-center font-bold text-lg mb-2 transition-all';
      label.className = 'text-sm font-medium text-gray-500 dark:text-gray-400';
    }
  });
  
  // Update connectors
  connectors.forEach((id, index) => {
    const connector = document.getElementById(id);
    if (index + 1 < currentPedidoStep) {
      connector.className = 'flex-1 h-1 bg-green-500 mx-4 mb-8 transition-all';
    } else {
      connector.className = 'flex-1 h-1 bg-gray-300 dark:bg-gray-600 mx-4 mb-8 transition-all';
    }
  });
}

function updateButtonsVisibility() {
  const anteriorBtn = document.getElementById('pedidoAnteriorBtn');
  const proximoBtn = document.getElementById('pedidoProximoBtn');
  const enviarBtn = document.getElementById('pedidoEnviarBtn');
  
  if (currentPedidoStep === 1) {
    anteriorBtn.classList.add('hidden');
    proximoBtn.classList.remove('hidden');
    proximoBtn.classList.add('flex');
    enviarBtn.classList.add('hidden');
  } else if (currentPedidoStep === 2) {
    anteriorBtn.classList.remove('hidden');
    anteriorBtn.classList.add('flex');
    proximoBtn.classList.remove('hidden');
    proximoBtn.classList.add('flex');
    enviarBtn.classList.add('hidden');
  } else if (currentPedidoStep === 3) {
    anteriorBtn.classList.remove('hidden');
    anteriorBtn.classList.add('flex');
    proximoBtn.classList.add('hidden');
    enviarBtn.classList.remove('hidden');
    enviarBtn.classList.add('flex');
  }
}

function validateStep1() {
  const responsavel = document.getElementById('pedidoResponsavel').value.trim();
  const dataInicio = document.getElementById('pedidoDataInicio').value;
  const dataVencimento = document.getElementById('pedidoDataVencimento').value;
  
  if (!responsavel) {
    showToast('Por favor, informe o responsável pelo pedido.', 'error');
    return false;
  }
  
  if (!dataInicio) {
    showToast('Por favor, informe a data de início.', 'error');
    return false;
  }
  
  if (!dataVencimento) {
    showToast('Por favor, informe a data de vencimento.', 'error');
    return false;
  }
  
  if (dataVencimento < dataInicio) {
    showToast('A data de vencimento deve ser posterior à data de início.', 'error');
    return false;
  }
  
  // Save step 1 data
  pedidoData.responsavel = responsavel;
  pedidoData.dataInicio = dataInicio;
  pedidoData.dataVencimento = dataVencimento;
  
  return true;
}

function validateStep2() {
  const incluirEm = document.getElementById('pedidoIncluirEm').value;
  const descricao = document.getElementById('pedidoDescricao').value.trim();
  const arquivo = document.getElementById('pedidoArquivo').files[0];
  const gravarComoEsta = document.getElementById('pedidoGravarComoEsta').checked;
  
  // Save step 2 data
  pedidoData.incluirEm = incluirEm;
  pedidoData.descricao = descricao;
  pedidoData.arquivo = arquivo ? arquivo.name : null;
  pedidoData.gravarComoEsta = gravarComoEsta;
  
  return true;
}

function pedidosNextStep() {
  if (currentPedidoStep === 1) {
    if (!validateStep1()) return;
  } else if (currentPedidoStep === 2) {
    if (!validateStep2()) return;
  }
  
  // Show loading
  document.getElementById('pedidosStep' + currentPedidoStep).classList.add('hidden');
  document.getElementById('pedidosLoading').classList.remove('hidden');
  
  // Simulate loading delay
  setTimeout(() => {
    currentPedidoStep++;
    updatePedidosStepDisplay();
  }, 1500);
}

function pedidosPreviousStep() {
  currentPedidoStep--;
  updatePedidosStepDisplay();
}

function updateResumo() {
  document.getElementById('resumoResponsavel').textContent = pedidoData.responsavel;
  document.getElementById('resumoDataInicio').textContent = formatDate(pedidoData.dataInicio);
  document.getElementById('resumoDataVencimento').textContent = formatDate(pedidoData.dataVencimento);
  
  const incluirEmText = {
    'programacao-principal': 'Programação Principal',
    'chamadas': 'Chamadas',
    'anuncios': 'Anúncios'
  };
  document.getElementById('resumoIncluirEm').textContent = incluirEmText[pedidoData.incluirEm];
  
  if (pedidoData.arquivo) {
    document.getElementById('resumoArquivoContainer').classList.remove('hidden');
    document.getElementById('resumoArquivo').textContent = pedidoData.arquivo;
  } else {
    document.getElementById('resumoArquivoContainer').classList.add('hidden');
  }
  
  if (pedidoData.descricao) {
    document.getElementById('resumoDescricaoContainer').classList.remove('hidden');
    document.getElementById('resumoDescricao').textContent = pedidoData.descricao;
  } else {
    document.getElementById('resumoDescricaoContainer').classList.add('hidden');
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('pt-BR');
}

function handlePedidoFileUpload(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (file.size > maxSize) {
      showToast('Arquivo muito grande! O tamanho máximo é 10MB.', 'error');
      input.value = '';
      return;
    }
    
    const fileName = document.getElementById('pedidoFileName');
    fileName.textContent = `Arquivo selecionado: ${file.name}`;
    fileName.classList.remove('hidden');
  }
}

function enviarPedido() {
  // Simulate sending
  showToast('Pedido enviado com sucesso!', 'success');
  
  setTimeout(() => {
    closePedidosModal();
  }, 1500);
}
