// UI/DOM - Login
// Importa: logica/usuarios.js e logica/validacoes.js

window.onload = () => {
  const user = JSON.parse(localStorage.getItem('moveup_user') || '{}');
  if (user.nome) {
    window.location.href = './perfil.html';
  }
};

function handleLogin() {
  const email = document.getElementById('inp-email').value.trim();
  const senha = document.getElementById('inp-senha').value;
  
  // Busca usuários do localStorage
  const users = JSON.parse(localStorage.getItem('moveup_users') || '[]');
  
  // Valida usando a função pura de lógica
  // Nota: validarLogin está em logica/usuarios.js
  // Aqui você deve ter <script src="./logica/usuarios.js"></script> ANTES deste script
  const resultado = validarLogin(email, senha, users);

  if (!resultado.valido) {
    alert(resultado.erro);
    return;
  }

  localStorage.setItem('moveup_user', JSON.stringify(resultado.usuario));
  window.location.href = './perfil.html';
}
