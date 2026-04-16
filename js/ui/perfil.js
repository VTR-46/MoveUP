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
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  avatarEl.textContent = initials || '?';

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

function init() {
  const user = JSON.parse(localStorage.getItem('moveup_user') || '{}');
  if (!user.nome) {
    window.location.href = './login.html';
    return;
  }

  renderProfile();
  renderStreak();
  renderStats();
}

init();
