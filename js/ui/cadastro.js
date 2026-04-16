// UI/DOM - Cadastro
// Importa: logica/usuarios.js e logica/validacoes.js

window.onload = () => {
  const user = JSON.parse(localStorage.getItem('moveup_user') || '{}');
  if (user.nome) {
    window.location.href = './perfil.html';
  }
};

let currentStep = 1;
const totalSteps = 3;

function checkStrength(val) {
  // Usa a função pura calcularForcaSenha
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
  
  // Valida usando a função pura de lógica
  const resultado = validarCadastro(nome, sobrenome, email, senha, users);

  if (!resultado.valido) {
    return showError(resultado.erro);
  }

  document.getElementById('form-error').classList.add('hidden');
  const newUser = resultado.usuario;
  
  localStorage.setItem('moveup_user', JSON.stringify(newUser));
  users.push(newUser);
  localStorage.setItem('moveup_users', JSON.stringify(users));
  document.getElementById('popup-overlay').classList.add('active');
}

function closePopup() {
  document.getElementById('popup-overlay').classList.remove('active');
  window.location.href = './perfil.html';
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
  if (currentStep > 1) { currentStep--; updateUI(); }
}

function saveOnboarding() {
  const nivel = document.querySelector('input[name="nivel"]:checked')?.value || '';
  const objetivos = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(el => el.value);
  const obs = document.getElementById('inp-obs').value.trim();
  const existing = JSON.parse(localStorage.getItem('moveup_user') || '{}');

  const updatedUser = {
    ...existing, nivel, objetivos,
    observacao: obs,
    onboarding_completo: true,
    data_cadastro: new Date().toISOString()
  };
  localStorage.setItem('moveup_user', JSON.stringify(updatedUser));

  const users = JSON.parse(localStorage.getItem('moveup_users') || '[]');
  const filtered = users.filter(u => u.email !== updatedUser.email);
  filtered.push(updatedUser);
  localStorage.setItem('moveup_users', JSON.stringify(filtered));
}

function buildSummary() {
  const nivelLabels = { sedentario: 'Sedentário', iniciante: 'Iniciante', intermediario: 'Intermediário', avancado: 'Avançado' };
  const objLabels = { perder_peso: 'Perder peso', ganhar_massa: 'Ganhar massa muscular', melhorar_condicionamento: 'Melhorar condicionamento', reducao_stress: 'Reduzir estresse', flexibilidade: 'Flexibilidade', saude_geral: 'Saúde geral', preparacao_evento: 'Preparação p/ evento' };
  const nivel = document.querySelector('input[name="nivel"]:checked')?.value;
  const objetivos = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(el => el.value);
  const obs = document.getElementById('inp-obs').value.trim();
  const user = JSON.parse(localStorage.getItem('moveup_user') || '{}');
  let html = '';
  if (user.nome) html += `<div class="flex items-start gap-2"><span class="text-[11px] text-gray-400 w-20 shrink-0 pt-0.5">Nome</span><span class="text-[13px] font-medium text-dark">${user.nome} ${user.sobrenome || ''}</span></div>`;
  if (nivel) html += `<div class="flex items-start gap-2"><span class="text-[11px] text-gray-400 w-20 shrink-0 pt-0.5">Nível</span><span class="text-[13px] font-medium text-dark">${nivelLabels[nivel]}</span></div>`;
  if (objetivos.length) html += `<div class="flex gap-2"><span class="text-[11px] text-gray-400 w-20 shrink-0 pt-0.5">Objetivos</span><span class="text-[13px] font-medium text-dark">${objetivos.map(o => objLabels[o]).join(', ')}</span></div>`;
  if (obs) html += `<div class="flex gap-2"><span class="text-[11px] text-gray-400 w-20 shrink-0 pt-0.5">Obs.</span><span class="text-[13px] font-medium text-dark">${obs}</span></div>`;
  document.getElementById('summary-body').innerHTML = html;
}

updateUI();
