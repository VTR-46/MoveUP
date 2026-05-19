// ========== GERENCIAMENTO DE USUÁRIOS ==========

function getUser() {
  return JSON.parse(localStorage.getItem('moveup_user') || '{}');
}

function saveUser(data) {
  const existing = getUser();
  const updated = { ...existing, ...data };
  localStorage.setItem('moveup_user', JSON.stringify(updated));
  
  const users = JSON.parse(localStorage.getItem('moveup_users') || '[]');
  const filtered = users.filter(u => u.email !== updated.email);
  filtered.push(updated);
  localStorage.setItem('moveup_users', JSON.stringify(filtered));
}

function getHistory() {
  return JSON.parse(localStorage.getItem('moveup_history_' + getUser().email) || '[]');
}

function getWorkouts() {
  return JSON.parse(localStorage.getItem('moveup_workouts_' + getUser().email) || '[]');
}

function getStreakData() {
  const raw = localStorage.getItem('moveup_streak_' + getUser().email);
  if (raw) return JSON.parse(raw);
  return { current: 0, best: 0, lastDate: null, activeDays: [] };
}

function saveStreakData(data) {
  localStorage.setItem('moveup_streak_' + getUser().email, JSON.stringify(data));
}

// ========== VALIDAÇÕES ==========

function validarLogin(email, senha, users = []) {
  if (!email || !senha) {
    return { valido: false, erro: "Por favor, preencha e-mail e senha." };
  }

  const usuario = users.find(u => u.email === email && u.senha === senha);
  
  if (!usuario) {
    return { valido: false, erro: "Credenciais incorretas." };
  }

  return { valido: true, usuario };
}

function validarCadastro(nome, sobrenome, email, senha, users = []) {
  if (!nome || !sobrenome) {
    return { valido: false, erro: "Preencha seu nome e sobrenome." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { valido: false, erro: "Insira um e-mail válido." };
  }

  if (senha.length < 6) {
    return { valido: false, erro: "A senha deve ter pelo menos 6 caracteres." };
  }
  if (users.find(u => u.email === email)) {
    return { valido: false, erro: "E-mail já cadastrado." };
  }

  return { 
    valido: true, 
    usuario: { nome, sobrenome, email, senha }
  };
}

function criarNovoUsuario(nome, sobrenome, email, senha) {
  return {
    nome,
    sobrenome,
    email,
    senha,
    criado_em: new Date().toISOString()
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validarLogin,
    validarCadastro,
    criarNovoUsuario
  };
}
