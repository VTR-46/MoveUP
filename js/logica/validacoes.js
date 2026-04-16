/**
 * Funções de validação pura (sem DOM)
 * Testáveis via JEST
 */

// Função de busca de caractere na cadeia (seus testes JEST)
function buscar(tamanho, cadeia, caractere) {
  if (tamanho < 1 || tamanho > 20) {
    return "entre com um inteiro entre 1 e 20";
  }

  const posicao = cadeia.indexOf(caractere) + 1;

  if (posicao === 0) {
    return `o caractere ${caractere} não pertence à cadeia`;
  }

  return `o caractere ${caractere} aparece na posição ${posicao} da cadeia`;
}

// Validar email
function validarEmail(email) {
  if (!email) return { valido: false, erro: "E-mail não pode estar vazio." };
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return { valido: false, erro: "Insira um e-mail válido." };
  }
  return { valido: true };
}

// Calcular força da senha (baseado no código do cadastro.js)
function calcularForcaSenha(senha) {
  let score = 0;
  
  // Sempre começa com 1 se tem conteúdo
  if (senha.length > 0) score = 1;
  
  // Somando pontos por complexidade
  if (senha.length >= 8) score++;
  if (/[A-Z]/.test(senha)) score++;
  if (/[0-9]/.test(senha)) score++;
  if (/[^A-Za-z0-9]/.test(senha)) score++;
  
  const labels = ['Muito fraca', 'Fraca', 'Média', 'Forte'];
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e'];
  
  return {
    score: Math.min(score, 4),  // Máximo 4 pontos
    label: senha.length ? (labels[Math.min(score - 1, 3)] || 'Muito fraca') : '',
    color: score > 0 ? colors[Math.min(score - 1, 3)] : '#9ca3af'
  };
}

// Validar nome e sobrenome
function validarNome(nome) {
  if (!nome || nome.trim() === '') {
    return { valido: false, erro: "Nome não pode estar vazio." };
  }
  return { valido: true };
}

// Validar senha
function validarSenha(senha) {
  if (!senha) return { valido: false, erro: "Senha não pode estar vazia." };
  if (senha.length < 6) {
    return { valido: false, erro: "A senha deve ter pelo menos 6 caracteres." };
  }
  return { valido: true };
}

// Validar username
function validarUsername(username) {
  if (!username || username.trim() === '') {
    return { valido: false, erro: "Nome de usuário não pode estar vazio." };
  }
  const cleaned = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
  if (cleaned.length < 3) {
    return { valido: false, erro: "O nome de usuário precisa ter pelo menos 3 caracteres." };
  }
  return { valido: true, username: cleaned };
}

// Exportar para Node.js/JEST
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    buscar,
    validarEmail,
    calcularForcaSenha,
    validarNome,
    validarSenha,
    validarUsername
  };
}
