window.onload = () => {
  const user = JSON.parse(localStorage.getItem('moveup_user') || '{}');
  if (user.nome) {
    window.location.href = './perfil.html';
  }
};

function handleLogin() {
  const email = document.getElementById('inp-email').value.trim();
  const senha = document.getElementById('inp-senha').value;
  
  if (!email || !senha) {
    alert("Por favor, preencha e-mail e senha.");
    return;
  }

  const users = JSON.parse(localStorage.getItem('moveup_users') || '[]');
  const user = users.find(u => u.email === email && u.senha === senha);

  if (!user) {
    alert("Credenciais incorretas.");
    return;
  }
  
  localStorage.setItem('moveup_user', JSON.stringify(user));
  window.location.href = './perfil.html';
}