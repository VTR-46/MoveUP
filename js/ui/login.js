window.onload = () => {
  const user = JSON.parse(localStorage.getItem('moveup_user') || '{}');
  if (user.nome) {
    window.location.href = './homepage.html';
  }
};

function handleLogin() {
  const email = document.getElementById('inp-email').value.trim();
  const senha = document.getElementById('inp-senha').value;
  
  const users = JSON.parse(localStorage.getItem('moveup_users') || '[]');
  
  const resultado = validarLogin(email, senha, users);

  if (!resultado.valido) {
    alert(resultado.erro);
    return;
  }

  localStorage.setItem('moveup_user', JSON.stringify(resultado.usuario));
  window.location.href = './homepage.html';
}
