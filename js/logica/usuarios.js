/**
 * Funções de negócio para usuários (login/cadastro)
 * Lógica pura - sem DOM, sem localStorage direto
 */

// Validar login com lista de usuários
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

// Validar cadastro e conferir se email já existe
function validarCadastro(nome, sobrenome, email, senha, users = []) {
  // Validar campos vazios
  if (!nome || !sobrenome) {
    return { valido: false, erro: "Preencha seu nome e sobrenome." };
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { valido: false, erro: "Insira um e-mail válido." };
  }

  // Validar senha
  if (senha.length < 6) {
    return { valido: false, erro: "A senha deve ter pelo menos 6 caracteres." };
  }

  // Verificar email duplicado
  if (users.find(u => u.email === email)) {
    return { valido: false, erro: "E-mail já cadastrado." };
  }

  return { 
    valido: true, 
    usuario: { nome, sobrenome, email, senha }
  };
}

// Criar novo usuário com dados completos
function criarNovoUsuario(nome, sobrenome, email, senha) {
  return {
    nome,
    sobrenome,
    email,
    senha,
    criado_em: new Date().toISOString()
  };
}

// Exportar para Node.js/JEST
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validarLogin,
    validarCadastro,
    criarNovoUsuario
  };
}
