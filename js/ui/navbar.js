/**
 * Componente de navbar reutilizável com foto do usuário
 */

function renderNavbar() {
  const navbarHTML = `
    <nav class="bg-dark fixed inset-x-0 z-50 top-0 border-none">
      <div class="w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="../html/homepage.html" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="../img/MoveUPSoloWhite.png" class="h-7" alt="MoveUP Logo" />
        </a>
        <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-default" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/></svg>
        </button>
        <div class="hidden w-full md:flex md:w-auto items-center gap-6" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <a href="../html/homepage.html" class="block py-2 px-3 text-white rounded md:bg-transparent md:text-fg-brand md:p-0 hover:text-cyan-500 transition-colors">Home</a>
            </li>
            <li>
              <a href="../html/exercicios.html" class="block py-2 px-3 text-white rounded md:bg-transparent md:text-fg-brand md:p-0 hover:text-cyan-500 transition-colors">Treinos</a>
            </li>
            <li>
              <a href="../html/perfil.html" class="block py-2 px-3 text-white rounded md:bg-transparent md:text-fg-brand md:p-0 hover:text-cyan-500 transition-colors">Perfil</a>
            </li>
            <li>
              <a onclick="logout()" class="block py-2 px-3 text-white rounded md:bg-transparent md:text-fg-brand md:p-0 hover:text-cyan-500 transition-colors cursor-pointer">Sair</a>
            </li>
          </ul>
          <div class="hidden md:flex items-center">
            <button onclick="redirectToProfile()" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div class="w-10 h-10 rounded-full bg-gray-100 border-2 border-cyan-500 flex items-center justify-center overflow-hidden text-sm font-bold text-brand" id="navbar-avatar">
                ?
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  `;

  // Procura por um elemento com id navbar-container ou insere antes de main
  let navContainer = document.getElementById('navbar-container');
  if (!navContainer) {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      navContainer = document.createElement('div');
      navContainer.id = 'navbar-container';
      document.body.insertBefore(navContainer, mainElement);
    }
  }

  if (navContainer) {
    navContainer.innerHTML = navbarHTML;
    updateNavbarAvatar();
  }
}

function updateNavbarAvatar() {
  const user = getUser();
  const avatarEl = document.getElementById('navbar-avatar');
  
  if (!avatarEl) return;

  if (user.imagemCaminho) {
    // Se há imagem, exibe ela pelo caminho
    avatarEl.innerHTML = `<img src="${user.imagemCaminho}" alt="Avatar" class="w-full h-full object-cover" />`;
    avatarEl.title = user.imagemCaminho;
  } else {
    // Caso contrário, mostra iniciais
    const name = [user.nome, user.sobrenome].filter(Boolean).join(' ') || 'Usuário';
    const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    avatarEl.innerHTML = initials || '?';
    avatarEl.textContent = initials || '?';
  }
}

function redirectToProfile() {
  window.location.href = '../html/perfil.html';
}

// Atualiza navbar quando usuário muda
function onUserDataChange() {
  updateNavbarAvatar();
}

// Watch para mudanças no localStorage
window.addEventListener('storage', function(e) {
  if (e.key === 'moveup_user') {
    updateNavbarAvatar();
  }
});

// Listener para evento customizado de atualização
window.addEventListener('updateAvatar', function() {
  updateNavbarAvatar();
});

// Renderiza navbar quando o script é carregado
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('nav.bg-dark') === null) {
    renderNavbar();
  } else {
    // Se já existe navbar, apenas atualiza o avatar
    updateNavbarAvatar();
  }
});

// Também atualiza quando há mudanças em outra aba
setInterval(function() {
  updateNavbarAvatar();
}, 500);
