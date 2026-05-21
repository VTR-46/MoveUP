window.onload = () => {
  const user = JSON.parse(localStorage.getItem('moveup_user') || '{}');
  if (user.nome) {
    window.location.href = './homepage.html';
  }
};

function togglePasswordCadastro() {
  const input = document.getElementById('inp-senha');
  const icon = document.getElementById('eye-icon-cadastro');
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m4.753-4.753A3.375 3.375 0 0021 12a9.973 9.973 0 01-1.457 5.197m0 0A9.97 9.97 0 0112 5c-4.478 0-8.268 2.943-9.543 7a10.025 10.025 0 002.273 4.826m0 0C3.732 16.057 7.523 19 12 19c4.478 0 8.268-2.943 9.543-7"></path>';
  } else {
    input.type = 'password';
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>';
  }
}

let currentStep = 1;
const totalSteps = 3;
let tempUser = null;

function checkStrength(val) {
  const forcaData = calcularForcaSenha(val);
  
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e'];
  
  ['s1', 's2', 's3', 's4'].forEach((id, i) => {
    document.getElementById(id).style.background = i < forcaData.score ? colors[forcaData.score - 1] : '#e5e7eb';
  });
  
  const lbl = document.getElementById('strength-label');
  lbl.textContent = forcaData.label;
  lbl.style.color = forcaData.color;
}

function showError(msg) {
  const el = document.getElementById('form-error');
  el.textContent = msg;
  el.classList.remove('hidden');
}

function handleSignup() {
  const nome = document.getElementById('inp-nome').value.trim();
  const sobrenome = document.getElementById('inp-sobrenome').value.trim();
  const email = document.getElementById('inp-email').value.trim();
  const senha = document.getElementById('inp-senha').value;
  
  const users = JSON.parse(localStorage.getItem('moveup_users') || '[]');
  
  const resultado = validarCadastro(nome, sobrenome, email, senha, users);

  if (!resultado.valido) {
    return showError(resultado.erro);
  }

  document.getElementById('form-error').classList.add('hidden');
  tempUser = resultado.usuario;
  currentStep = 1;
  document.getElementById('popup-overlay').classList.add('active');
}

function closePopup() {
  document.getElementById('popup-overlay').classList.remove('active');
  tempUser = null;
  currentStep = 1;
}

function updateUI() {
  for (let i = 1; i <= 4; i++) {
    document.getElementById('step-' + i).classList.toggle('active', i === currentStep);
  }
  const pct = Math.min(Math.round((currentStep / totalSteps) * 100), 100);
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('step-pct').textContent = pct + '%';
  document.getElementById('step-label').textContent = currentStep <= totalSteps
    ? `Etapa ${currentStep} de ${totalSteps}` : 'Concluído';
  const footer = document.getElementById('popup-footer');
  const btnBack = document.getElementById('btn-back');
  const btnNext = document.getElementById('btn-next');
  if (currentStep === 4) {
    footer.classList.add('hidden');
  } else {
    footer.classList.remove('hidden');
    btnBack.classList.toggle('hidden', currentStep === 1);
    btnNext.textContent = currentStep === totalSteps ? 'Finalizar' : 'Continuar';
  }
}

function nextStep() {
  if (currentStep === 1) {
    if (!document.querySelector('input[name="nivel"]:checked')) {
      document.getElementById('err-1').classList.remove('hidden');
      return;
    }
    document.getElementById('err-1').classList.add('hidden');
  }
  if (currentStep === 2) {
    if (!document.querySelectorAll('input[type="checkbox"]:checked').length) {
      document.getElementById('err-2').classList.remove('hidden');
      return;
    }
    document.getElementById('err-2').classList.add('hidden');
  }
  if (currentStep === totalSteps) {
    saveOnboarding();
    buildSummary();
    currentStep = 4;
    updateUI();
    return;
  }
  currentStep++;
  updateUI();
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateUI();
  }
}

function saveOnboarding() {
  const nivel = document.querySelector('input[name="nivel"]:checked')?.value || '';
  const objetivos = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(el => el.value);
  const obs = document.getElementById('inp-obs').value.trim();

  const updatedUser = {
    ...tempUser, 
    nivel, 
    objetivos,
    observacao: obs,
    onboarding_completo: true,
    data_cadastro: new Date().toISOString()
  };

  localStorage.setItem('moveup_user', JSON.stringify(updatedUser));

  const users = JSON.parse(localStorage.getItem('moveup_users') || '[]');
  const filtered = users.filter(u => u.email !== updatedUser.email);
  filtered.push(updatedUser);
  localStorage.setItem('moveup_users', JSON.stringify(filtered));
  
  tempUser = null;
  window.location.href = './homepage.html';
}

function buildSummary() {
  const nivelLabels = { sedentario: 'Sedentário', iniciante: 'Iniciante', intermediario: 'Intermediário', avancado: 'Avançado' };
  const objLabels = { perder_peso: 'Perder peso', ganhar_massa: 'Ganhar massa muscular', melhorar_condicionamento: 'Melhorar condicionamento', reducao_stress: 'Reduzir estresse', flexibilidade: 'Flexibilidade', saude_geral: 'Saúde geral', preparacao_evento: 'Preparação p/ evento' };
  const nivel = document.querySelector('input[name="nivel"]:checked')?.value;
  const objetivos = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(el => el.value);
  const obs = document.getElementById('inp-obs').value.trim();
  let html = '';
  if (tempUser && tempUser.nome) {
    html += `<div class="flex items-start gap-2"><span class="text-[11px] text-gray-400 w-20 shrink-0 pt-0.5">Nome</span><span class="text-[13px] font-medium text-dark">${tempUser.nome} ${tempUser.sobrenome || ''}</span></div>`;
  }
  if (nivel) {
    html += `<div class="flex items-start gap-2"><span class="text-[11px] text-gray-400 w-20 shrink-0 pt-0.5">Nível</span><span class="text-[13px] font-medium text-dark">${nivelLabels[nivel]}</span></div>`;
  }
  if (objetivos.length) {
    html += `<div class="flex gap-2"><span class="text-[11px] text-gray-400 w-20 shrink-0 pt-0.5">Objetivos</span><span class="text-[13px] font-medium text-dark">${objetivos.map(o => objLabels[o]).join(', ')}</span></div>`;
  }
  if (obs) {
    html += `<div class="flex gap-2"><span class="text-[11px] text-gray-400 w-20 shrink-0 pt-0.5">Obs.</span><span class="text-[13px] font-medium text-dark">${obs}</span></div>`;
  }
  document.getElementById('summary-body').innerHTML = html;
}

updateUI();
