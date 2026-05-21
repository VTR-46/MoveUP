window.onload = () => {
  const user = JSON.parse(localStorage.getItem('moveup_user') || '{}');
  if (user.nome) {
    window.location.href = './homepage.html';
  }
};

function togglePasswordLogin() {
  const input = document.getElementById('inp-senha');
  const icon = document.getElementById('eye-icon-login');
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m4.753-4.753A3.375 3.375 0 0021 12a9.973 9.973 0 01-1.457 5.197m0 0A9.97 9.97 0 0112 5c-4.478 0-8.268 2.943-9.543 7a10.025 10.025 0 002.273 4.826m0 0C3.732 16.057 7.523 19 12 19c4.478 0 8.268-2.943 9.543-7"></path>';
  } else {
    input.type = 'password';
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>';
  }
}

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
