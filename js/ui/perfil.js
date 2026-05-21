// Funções de usuário estão em js/logica/usuarios.js
// Este arquivo contém apenas funções de UI para perfil

function checkAndUpdateStreak() {
  const history = getHistory();
  const streak = getStreakData();
  
  // Usa função pura calcularStreak
  const updatedStreak = calcularStreak(history, streak);
  saveStreakData(updatedStreak);
  return updatedStreak;
}

function logout() {
  localStorage.removeItem('moveup_user');
  window.location.href = './login.html';
}

function getMyRank(myStreak) {
  const users = JSON.parse(localStorage.getItem('moveup_users') || '[]');
  const myEmail = getUser().email;
  let higherStreaks = 0;
  
  users.forEach(u => {
    if (u.email === myEmail) return;
    const s = JSON.parse(localStorage.getItem('moveup_streak_' + u.email) || '{"current":0}');
    if (s.current > myStreak) higherStreaks++;
  });
  
  return higherStreaks + 1;
}

function renderProfile() {
  const user = getUser();
  const name = [user.nome, user.sobrenome].filter(Boolean).join(' ') || 'Usuário';
  const username = user.username || (user.nome ? user.nome.toLowerCase().replace(/\s/g,'') + Math.floor(Math.random()*99) : 'usuario');
  if (!user.username) saveUser({ username });

  const bio = user.bio || 'Sem bio ainda.';
  const nivelLabels = { sedentario:'Sedentário', iniciante:'Iniciante', intermediario:'Intermediário', avancado:'Avançado' };

  document.getElementById('display-name').textContent = name;
  document.getElementById('display-username').textContent = '@' + username;
  document.getElementById('display-bio').textContent = bio;

  const avatarEl = document.getElementById('avatar-inner');
  
  // Verifica se existe imagem salva
  if (user.imagemCaminho) {
    avatarEl.innerHTML = `<img src="${user.imagemCaminho}" alt="Avatar do usuário" class="w-full h-full object-cover" />`;
  } else {
    const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    avatarEl.textContent = initials || '?';
  }

  if (user.nivel) {
    const badge = document.getElementById('level-badge');
    badge.textContent = nivelLabels[user.nivel] || user.nivel;
    badge.classList.remove('hidden');
  }
}

function renderStreak() {
  const streak = checkAndUpdateStreak();

  document.getElementById('streak-count').textContent = streak.current;
  document.getElementById('best-streak').textContent = streak.best;

  const today = todayStr();
  const history = getHistory();
  const workedToday = history.some(h => h.date && h.date.slice(0, 10) === today);
  document.getElementById('streak-subtitle').textContent = workedToday
    ? `Treino registrado hoje! Sequência mantida.`
    : `Complete um treino hoje para manter sua sequência!`;

  const pct = Math.min(streak.current / 30, 1);
  const ring = document.getElementById('streak-ring');
  if (ring) {
      const circumference = 2 * Math.PI * 44; 
      ring.style.strokeDashoffset = circumference - (pct * circumference);
  }
}

function renderStats() {
  const history = getHistory();
  const workouts = getWorkouts();
  const streak = getStreakData();

  const uniqueDays = new Set(history.map(h => h.date?.slice(0, 10)).filter(Boolean));

  document.getElementById('stat-workouts').textContent = workouts.length;
  document.getElementById('stat-days').textContent = uniqueDays.size;
  document.getElementById('total-completed').textContent = history.length;

  const rank = getMyRank(streak.current);
  document.getElementById('rank-position').textContent = '#' + rank;
}

function openEditModal(type) {
  const user = getUser();
  const overlay = document.getElementById('edit-overlay');
  const title = document.getElementById('edit-title');
  const body = document.getElementById('edit-body');

  if (type === 'profile' || type === 'username') {
    title.textContent = 'Editar Perfil';
    body.innerHTML = `
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-[12px] font-semibold text-gray-600 block mb-1.5">Nome</label>
            <input id="edit-nome" type="text" value="${user.nome || ''}" placeholder="Nome"
              class="w-full border border-gray-200 rounded-[10px] px-3.5 py-2.5 text-sm text-dark placeholder-gray-300 transition-colors"/>
          </div>
          <div>
            <label class="text-[12px] font-semibold text-gray-600 block mb-1.5">Sobrenome</label>
            <input id="edit-sobrenome" type="text" value="${user.sobrenome || ''}" placeholder="Sobrenome"
              class="w-full border border-gray-200 rounded-[10px] px-3.5 py-2.5 text-sm text-dark placeholder-gray-300 transition-colors"/>
          </div>
        </div>
        <div>
          <label class="text-[12px] font-semibold text-gray-600 block mb-1.5">Nome de usuário</label>
          <div class="flex items-center border border-gray-200 rounded-[10px] overflow-hidden focus-within:border-brand transition-colors">
            <span class="px-3 text-gray-400 text-sm bg-gray-50 h-full py-2.5 border-r border-gray-200">@</span>
            <input id="edit-username" type="text" value="${user.username || ''}" placeholder="seuusername"
              class="flex-1 px-3 py-2.5 text-sm text-dark placeholder-gray-300 border-none outline-none bg-white"/>
          </div>
          <p class="text-[11px] text-gray-400 mt-1">Sem espaços. Letras, números e _ permitidos.</p>
        </div>
        <div>
          <label class="text-[12px] font-semibold text-gray-600 block mb-1.5">Bio</label>
          <textarea id="edit-bio" rows="2" placeholder="Conte um pouco sobre você…"
            class="w-full border border-gray-200 rounded-[10px] px-3.5 py-2.5 text-sm text-dark placeholder-gray-300 transition-colors resize-none"
            style="font-family:'Poppins',sans-serif">${user.bio || ''}</textarea>
        </div>
        <p id="edit-error" class="text-[12px] text-red-500 hidden"></p>
        <button onclick="saveProfile()"
          class="w-full bg-dark text-white text-sm font-semibold py-3 rounded-full hover:bg-[#060e1c] transition-all cursor-pointer border-none active:scale-[0.98]">
          Salvar alterações
        </button>
      </div>`;
  }

  overlay.classList.add('active');
}

function closeEditModal() {
  document.getElementById('edit-overlay').classList.remove('active');
}

function openRankingModal() {
  document.getElementById('ranking-overlay').classList.add('active');
}

function closeRankingModal() {
  document.getElementById('ranking-overlay').classList.remove('active');
}

function saveProfile() {
  const nome = document.getElementById('edit-nome')?.value.trim();
  const sobrenome = document.getElementById('edit-sobrenome')?.value.trim();
  const username = document.getElementById('edit-username')?.value.trim().toLowerCase().replace(/[^a-z0-9_]/g,'');
  const bio = document.getElementById('edit-bio')?.value.trim();
  const errEl = document.getElementById('edit-error');

  if (username && username.length < 3) {
    errEl.textContent = 'O nome de usuário precisa ter pelo menos 3 caracteres.';
    errEl.classList.remove('hidden');
    return;
  }

  saveUser({ nome, sobrenome, username, bio });
  closeEditModal();
  init();
  showToast('Perfil atualizado com sucesso!');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Valida tipo de arquivo
  if (!file.type.startsWith('image/')) {
    showToast('Selecione uma imagem válida!');
    return;
  }

  // Valida tamanho (máximo 5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    showToast('A imagem não pode ter mais de 5MB!');
    return;
  }

  // Cria URL local para a imagem
  const reader = new FileReader();
  reader.onload = function(e) {
    const imagemCaminho = e.target.result;
    saveUser({ imagemCaminho });
    
    // Atualiza perfil
    renderProfile();
    
    // Força atualização da navbar em todas as abas
    window.dispatchEvent(new Event('updateAvatar'));
    
    // Aguarda um pouco e força nova leitura
    setTimeout(() => {
      if (typeof updateNavbarAvatar !== 'undefined') {
        updateNavbarAvatar();
      }
    }, 100);
    
    showToast('Foto de perfil atualizada!');
  };
  reader.readAsDataURL(file);

  // Limpa o input para permitir selecionar a mesma imagem novamente
  event.target.value = '';
}

function renderRanking() {
  const users = JSON.parse(localStorage.getItem('moveup_users') || '[]');
  const currentUserEmail = getUser().email;

  // Cria array com usuários e suas sequências
  const usersWithStreak = users.map(u => {
    const streak = JSON.parse(localStorage.getItem('moveup_streak_' + u.email) || '{"current":0}');
    return {
      ...u,
      currentStreak: streak.current,
      bestStreak: streak.best
    };
  });

  // Ordena por sequência atual (decrescente) com desempates
  usersWithStreak.sort((a, b) => {
    if (b.currentStreak !== a.currentStreak) {
      return b.currentStreak - a.currentStreak;
    }
    // Desempate 1: Privilegiar o usuário atual no ranking
    if (a.email === currentUserEmail) return -1;
    if (b.email === currentUserEmail) return 1;
    
    // Desempate 2: Melhor sequência
    if (b.bestStreak !== a.bestStreak) {
      return b.bestStreak - a.bestStreak;
    }
    
    // Desempate 3: Ordem alfabética
    return (a.nome || '').localeCompare(b.nome || '');
  });

  // Pega top 10
  const top10 = usersWithStreak.slice(0, 10);

  const rankingHTML = top10.map((u, index) => {
    const name = [u.nome, u.sobrenome].filter(Boolean).join(' ') || 'Usuário';
    const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    const isCurrentUser = u.email === currentUserEmail;
    
    // Posição real: quantidade de pessoas com score maior + 1 (Mesma lógica do getMyRank)
    const position = usersWithStreak.findIndex(user => user.currentStreak === u.currentStreak) + 1;
    
    const medal = position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : `#${position}`;

    const avatarHTML = u.imagemCaminho 
      ? `<img src="${u.imagemCaminho}" alt="Avatar" class="w-full h-full object-cover" />`
      : `<span class="text-sm font-bold text-brand">${initials}</span>`;

    return `
      <div class="flex items-center gap-4 p-4 rounded-2xl border ${isCurrentUser ? 'border-brand bg-blue-50' : 'border-gray-100 bg-white'} hover:shadow-sm transition-shadow">
        <div class="w-10 h-10 rounded-full bg-gray-100 border-2 ${isCurrentUser ? 'border-brand' : 'border-gray-200'} flex items-center justify-center overflow-hidden text-xs font-bold flex-shrink-0">
          ${avatarHTML}
        </div>
        
        <div class="flex-1">
          <p class="text-sm font-semibold text-dark">${name}</p>
          <p class="text-xs text-gray-500">@${u.username || name.toLowerCase()}</p>
        </div>

        <div class="text-right flex-shrink-0">
          <p class="text-2xl font-black text-amber-500">${medal}</p>
          <p class="text-xs text-gray-500 mt-1"><span class="font-bold text-dark">${u.currentStreak}</span> dias</p>
        </div>
      </div>
    `;
  }).join('');

  const listEl = document.getElementById('ranking-list');
  if (listEl) {
    listEl.innerHTML = rankingHTML || '<div class="text-center py-8 text-gray-400">Nenhum usuário no ranking ainda</div>';
  }
}

function renderHistory() {
  const history = getHistory();
  const listEl = document.getElementById('history-list');

  if (!listEl) return;

  if (history.length === 0) {
    listEl.innerHTML = '<div class="text-center py-8 text-gray-400">Nenhum treino concluído ainda</div>';
    return;
  }

  // Sort history by date (newest first)
  const sortedHistory = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Take top 5 recent workouts for UI
  const recentHistory = sortedHistory.slice(0, 5);

  const historyHTML = recentHistory.map(h => {
    const workoutName = h.workoutName || 'Treino Personalizado';
    const dateObj = new Date(h.date);
    const dateStr = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    return `
      <div class="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:shadow-sm transition-shadow">
        <div class="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <div class="flex-1">
          <p class="text-sm font-semibold text-dark">${workoutName}</p>
          <p class="text-xs text-gray-500">Concluído com sucesso</p>
        </div>

        <div class="text-right flex-shrink-0">
          <p class="text-xs font-bold text-dark">${dateStr}</p>
          <p class="text-xs text-gray-500">${timeStr}</p>
        </div>
      </div>
    `;
  }).join('');

  listEl.innerHTML = historyHTML;
}

function init() {
  const user = JSON.parse(localStorage.getItem('moveup_user') || '{}');
  if (!user.nome) {
    window.location.href = './login.html';
    return;
  }

  renderProfile();
  renderStreak();
  renderStats();
  renderRanking();
  renderHistory();
}

init();
