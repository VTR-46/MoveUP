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
