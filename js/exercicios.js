const MUSCLE_GROUPS = [
  { id: 'peito', label: 'Peito' },
  { id: 'costas', label: 'Costas' },
  { id: 'ombros', label: 'Ombros' },
  { id: 'biceps', label: 'Bíceps' },
  { id: 'triceps', label: 'Tríceps' },
  { id: 'pernas', label: 'Pernas' },
  { id: 'gluteos', label: 'Glúteos' },
  { id: 'abdomen', label: 'Abdômen' },
  { id: 'cardio', label: 'Cardio' },
  { id: 'full_body', label: 'Full Body' },
];

const EXERCISES_DB = {
  peito: {
    iniciante:     ['Flexão de braços','Supino com halteres','Crucifixo inclinado','Peck Deck (máquina)','Flexão inclinada (joelhos)'],
    intermediario: ['Supino reto (barra)','Supino inclinado','Crossover no cabo','Mergulho em paralelas','Flexão com palmas juntas'],
    avancado:      ['Supino declinado','Supino pega aberta','Flexão archer','Mergulho lastrado','Supino guilhotina'],
  },
  costas: {
    iniciante:     ['Remada curvada c/ halteres','Puxada frontal (máquina)','Remada baixa (cabo)','Superman','Pulldown no cabo'],
    intermediario: ['Barra fixa','Remada cavalinho','Serrote c/ halter','Pullover c/ halter','Remada unilateral'],
    avancado:      ['Barra fixa lastrada','Remada Pendlay','Levantamento terra','Pull-up com argolas','Remo máquina convergente'],
  },
  ombros: {
    iniciante:     ['Elevação lateral c/ halteres','Desenvolvimento c/ halteres','Elevação frontal','Encolhimento de ombros','Desenvolvimento Arnold (leve)'],
    intermediario: ['Desenvolvimento militar','Elevação lateral no cabo','Remada alta','Crucifixo invertido','Face pull'],
    avancado:      ['Desenvolvimento atrás do pescoço','Elevação lateral lastrada','Clean e pressione','Handstand push-up','Arnold press pesado'],
  },
  biceps: {
    iniciante:     ['Rosca direta c/ barra','Rosca alternada c/ halteres','Rosca martelo','Rosca concentrada','Rosca no cabo'],
    intermediario: ['Rosca Scott','Rosca inversa','Rosca 21','Rosca aranha','Rosca Zottman'],
    avancado:      ['Rosca com barra W pesada','Rosca inclinada','Curl preacher lastrado','Rosca dragão','Rosca isométrica máxima'],
  },
  triceps: {
    iniciante:     ['Extensão de tríceps no cabo','Tríceps testa','Tríceps coice','Dip entre bancos','Tríceps francês'],
    intermediario: ['Tríceps corda no cabo','Tríceps mergulho','Extensão unilateral','Kickback c/ halter','Supino fechado'],
    avancado:      ['Mergulho lastrado','Extensão pesada acima da cabeça','Dip anéis','Skull crusher c/ barra','Tríceps JM Press'],
  },
  pernas: {
    iniciante:     ['Agachamento livre','Leg press','Cadeira extensora','Cadeira flexora','Panturrilha em pé'],
    intermediario: ['Agachamento c/ barra','Stiff','Avanço c/ halteres','Hack squat','Leg curl deitado'],
    avancado:      ['Agachamento profundo c/ barra','Levantamento terra romeno','Pistol squat','Bulgarian split squat','Agachamento búlgaro lastrado'],
  },
  gluteos: {
    iniciante:     ['Ponte de glúteo','Abdução de quadril','Kickback','Agachamento sumô','Step-up no banco'],
    intermediario: ['Hip thrust c/ barra','Agachamento sumô pesado','Kickback no cabo','Abdução no cabo','Avanço reverso'],
    avancado:      ['Hip thrust lastrado','Agachamento sumô máximo','Pull-through','Glute drive máquina','RDL unilateral'],
  },
  abdomen: {
    iniciante:     ['Prancha','Crunch básico','Elevação de pernas','Bicicleta','Contração abdominal'],
    intermediario: ['Prancha lateral','Ab wheel','Crunch inverso','Russian twist','Hollow body hold'],
    avancado:      ['Dragon flag','Ab wheel em pé','V-up','Hanging leg raise','Canivete'],
  },
  cardio: {
    iniciante:     ['Caminhada rápida 20 min','Pulo de corda 5 min','Jumping jack','Step básico','Bicicleta ergométrica leve'],
    intermediario: ['Corrida 20 min','HIIT 15 min','Burpee','Mountain climber','Remo ergométrico'],
    avancado:      ['Corrida intervalada','HIIT tabata','Box jump','Sprint 100m x8','Assault bike'],
  },
  full_body: {
    iniciante:     ['Agachamento c/ flexão','Remada + desenvolvimento','Lunges alternados','Prancha com toque de ombro','Agachamento sumo + curl'],
    intermediario: ['Thruster','Man maker','Kettlebell swing','Complexo de barra','Circuit training 5 exercícios'],
    avancado:      ['Clean & jerk','Snatch','Turkish get-up','Complexo Barbell pesado','CrossFit WOD'],
  },
};

let currentStep = 1;
let selectedMuscle = null;
let selectedLevel = null;
let selectedExercises = new Set();
let allExercises = [];
let workouts = [];
let activeWorkout = null;
let currentUser = {};

function init() {
  currentUser = JSON.parse(localStorage.getItem('moveup_user') || '{}');
  if (!currentUser.nome) {
    window.location.href = './login.html';
    return;
  }
  workouts = JSON.parse(localStorage.getItem('moveup_workouts_' + currentUser.email) || '[]');
  renderWorkouts();
  renderMuscleGroups();
}

function logout() {
  localStorage.removeItem('moveup_user');
  window.location.href = './login.html';
}

function renderWorkouts(filter = '') {
  const grid = document.getElementById('workouts-grid');
  const empty = document.getElementById('empty-state');
  const filtered = workouts.filter(w => w.name.toLowerCase().includes(filter.toLowerCase()));

  if (!filtered.length) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  const focusLabel = { hipertrofia:'Hipertrofia', forca:'Força', resistencia:'Resistência', queima:'Queima de gordura' };
  const nivelLabel = { iniciante:'Iniciante', intermediario:'Intermediário', avancado:'Avançado' };

  grid.innerHTML = filtered.map(w => `
    <div class="workout-card bg-white" onclick="openWorkoutDetail('${w.id}')">
      <div class="flex items-start justify-between mb-3">
        <div class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
          <img src="https://marketplace.canva.com/rgz8Q/MAHFBsrgz8Q/1/tl/canva-dumbbells-MAHFBsrgz8Q.png" alt="Treino" class="w-7 h-7 object-contain">
        </div>
        <span class="badge">${nivelLabel[w.nivel] || w.nivel}</span>
      </div>
      <h3 class="text-[15px] font-bold text-dark mb-0.5 leading-snug">${w.name}</h3>
      <p class="text-[12px] text-gray-400 mb-3">
        ${MUSCLE_GROUPS.find(m => m.id === w.muscle)?.label || w.muscle} · ${focusLabel[w.foco] || w.foco} · ${w.duracao} min
      </p>
      <div class="flex items-center gap-2 flex-wrap">
        ${w.exercises.slice(0, 3).map(e => `<span class="pill-tag">${e}</span>`).join('')}
        ${w.exercises.length > 3 ? `<span class="pill-tag">+${w.exercises.length - 3}</span>` : ''}
      </div>
      <div class="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
        <span class="text-[11.5px] text-gray-400">${w.exercises.length} exercícios</span>
        <span class="text-[11.5px] font-semibold text-brand">Ver treino</span>
      </div>
    </div>
  `).join('');
}

document.getElementById('search-workouts').addEventListener('input', e => renderWorkouts(e.target.value));

function renderMuscleGroups() {
  const container = document.getElementById('muscle-groups');
  container.innerHTML = MUSCLE_GROUPS.map(m => `
    <button onclick="selectMuscle('${m.id}', this)"
      class="flex flex-col items-center gap-1 p-3 border-[1.5px] border-gray-200 rounded-xl text-[12px] font-medium text-dark hover:border-brand hover:bg-blue-50 transition-all cursor-pointer bg-white"
      data-muscle="${m.id}">
      ${m.label}
    </button>
  `).join('');
}

function selectMuscle(id, btn) {
  selectedMuscle = id;
  document.querySelectorAll('#muscle-groups button').forEach(b => {
    b.classList.remove('border-brand', 'bg-blue-50', 'font-bold');
    b.style.color = '';
  });
  btn.classList.add('border-brand', 'bg-blue-50', 'font-bold');
}

function openNewWorkoutModal() {
  selectedMuscle = null; selectedLevel = null;
  selectedExercises = new Set();
  currentStep = 1;
  resetNewModal();
  document.getElementById('new-modal').classList.remove('hidden');
  document.getElementById('detail-modal').classList.add('hidden');
  document.getElementById('overlay').classList.add('active');
  updateStepUI();
}

function openWorkoutDetail(id) {
  activeWorkout = workouts.find(w => w.id === id);
  if (!activeWorkout) return;

  document.getElementById('detail-title').textContent = activeWorkout.name;
  const focusLabel = { hipertrofia:'Hipertrofia', forca:'Força', resistencia:'Resistência', queima:'Queima de gordura' };
  document.getElementById('detail-meta').textContent =
    `${MUSCLE_GROUPS.find(m => m.id === activeWorkout.muscle)?.label} · ${focusLabel[activeWorkout.foco]} · ${activeWorkout.duracao} min`;

  const list = document.getElementById('detail-ex-list');
  list.innerHTML = activeWorkout.exercises.map((e, i) => `
    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
      <span class="w-6 h-6 bg-dark text-white rounded-full text-[11px] font-bold flex items-center justify-center flex-shrink-0">${i+1}</span>
      <span class="text-[13.5px] font-medium text-dark">${e}</span>
    </div>
  `).join('');

  document.getElementById('new-modal').classList.add('hidden');
  document.getElementById('detail-modal').classList.remove('hidden');
  document.getElementById('overlay').classList.add('active');
}

function closeModal() {
  document.getElementById('overlay').classList.remove('active');
  setTimeout(() => {
    document.getElementById('new-modal').classList.add('hidden');
    document.getElementById('detail-modal').classList.add('hidden');
    const card = document.getElementById('modal-card');
    if (card) { card.style.transform = ''; card.style.opacity = ''; }
  }, 350);
}

function resetNewModal() {
  document.getElementById('workout-name').value = '';
  document.getElementById('ex-search').value = '';
  document.querySelectorAll('input[name="nivel-ex"]').forEach(r => r.checked = false);
  document.querySelectorAll('input[name="foco"]').forEach(r => r.checked = false);
  document.querySelectorAll('input[name="duracao"]').forEach(r => r.checked = false);
  renderMuscleGroups();
  ['err-s1','err-s2','err-s3'].forEach(id => document.getElementById(id).classList.add('hidden'));
}

function updateStepUI() {
  [1, 2, 3].forEach(i => {
    document.getElementById('s' + i).classList.toggle('active', i === currentStep);
  });
  const pct = Math.round((currentStep / 3) * 100);
  document.getElementById('prog-bar').style.width = pct + '%';
  document.getElementById('step-label').textContent = `Etapa ${currentStep} de 3`;
  document.getElementById('btn-back').classList.toggle('hidden', currentStep === 1);
  document.getElementById('btn-next').textContent = currentStep === 3 ? 'Salvar treino' : 'Continuar';
}

function nextStep() {
  if (currentStep === 1) {
    selectedLevel = document.querySelector('input[name="nivel-ex"]:checked')?.value;
    if (!selectedMuscle || !selectedLevel) {
      const errS1 = document.getElementById('err-s1');
      errS1.classList.remove('hidden');
      errS1.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    document.getElementById('err-s1').classList.add('hidden');
    buildExerciseList();
    currentStep = 2; updateStepUI(); return;
  }
  if (currentStep === 2) {
    const foco = document.querySelector('input[name="foco"]:checked')?.value;
    const dur = document.querySelector('input[name="duracao"]:checked')?.value;
    if (!foco || !dur) {
      document.getElementById('err-s2').classList.remove('hidden'); return;
    }
    document.getElementById('err-s2').classList.add('hidden');
    currentStep = 3; updateStepUI(); renderExerciseList(); return;
  }
  if (currentStep === 3) {
    if (selectedExercises.size === 0) {
      document.getElementById('err-s3').classList.remove('hidden'); return;
    }
    document.getElementById('err-s3').classList.add('hidden');
    saveWorkout(); return;
  }
}

function prevStep() {
  if (currentStep > 1) { currentStep--; updateStepUI(); }
}

function buildExerciseList() {
  const pool = EXERCISES_DB[selectedMuscle]?.[selectedLevel] || [];
  const all = new Set([
    ...(EXERCISES_DB[selectedMuscle]?.iniciante || []),
    ...(EXERCISES_DB[selectedMuscle]?.intermediario || []),
    ...(EXERCISES_DB[selectedMuscle]?.avancado || []),
  ]);
  allExercises = Array.from(all).map(name => ({
    name,
    suggested: pool.includes(name)
  }));
  selectedExercises = new Set(pool);
  updateSelCount();
}

function renderExerciseList(filter = '') {
  const container = document.getElementById('exercise-list');
  const lf = filter.toLowerCase();
  const visible = allExercises.filter(e => !lf || e.name.toLowerCase().includes(lf));

  container.innerHTML = visible.map(e => {
    const checked = selectedExercises.has(e.name);
    return `
      <div class="opt-item">
        <input type="checkbox" id="ex-${e.name}" ${checked ? 'checked' : ''} onchange="toggleExercise('${e.name}', this.checked)"/>
        <label for="ex-${e.name}">
          <span class="check-box">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          <span class="flex-1 text-[13px]">${e.name}</span>
          ${e.suggested ? '<span class="text-[10px] bg-brand text-white rounded-full px-2 py-0.5 font-semibold">Sugerido</span>' : ''}
        </label>
      </div>
    `;
  }).join('');
  updateSelCount();

  const tags = document.getElementById('filter-tags');
  const levels = ['iniciante','intermediario','avancado'];
  const lbl = { iniciante:'Iniciante', intermediario:'Intermediário', avancado:'Avançado' };
  tags.innerHTML = levels.map(lv => `
    <button onclick="filterByLevel('${lv}')"
      class="pill-tag cursor-pointer border-none ${lv === selectedLevel ? 'active' : ''} hover:bg-blue-50"
      data-lv="${lv}">${lbl[lv]}</button>
  `).join('') + `<button onclick="filterByLevel(null)" class="pill-tag cursor-pointer border-none hover:bg-blue-50">Todos</button>`;
}

function filterByLevel(lv) {
  const pool = lv ? (EXERCISES_DB[selectedMuscle]?.[lv] || []) : null;
  const container = document.getElementById('exercise-list');
  const searchVal = document.getElementById('ex-search').value;
  const lf = searchVal.toLowerCase();

  const visible = allExercises.filter(e => {
    const matchSearch = !lf || e.name.toLowerCase().includes(lf);
    const matchLevel = !pool || pool.includes(e.name);
    return matchSearch && matchLevel;
  });

  container.innerHTML = visible.map(e => {
    const checked = selectedExercises.has(e.name);
    return `
      <div class="opt-item">
        <input type="checkbox" id="ex-${e.name}" ${checked ? 'checked' : ''} onchange="toggleExercise('${e.name}', this.checked)"/>
        <label for="ex-${e.name}">
          <span class="check-box">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          <span class="flex-1 text-[13px]">${e.name}</span>
          ${e.suggested ? '<span class="text-[10px] bg-brand text-white rounded-full px-2 py-0.5 font-semibold">Sugerido</span>' : ''}
        </label>
      </div>
    `;
  }).join('');

  document.querySelectorAll('[data-lv]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lv === lv);
  });
  updateSelCount();
}

function filterExercises(val) { renderExerciseList(val); }

function toggleExercise(name, checked) {
  checked ? selectedExercises.add(name) : selectedExercises.delete(name);
  updateSelCount();
}

function updateSelCount() {
  document.getElementById('sel-count').textContent = selectedExercises.size;
}

function saveWorkout() {
  const name = document.getElementById('workout-name').value.trim() ||
    `${MUSCLE_GROUPS.find(m => m.id === selectedMuscle)?.label} — ${new Date().toLocaleDateString('pt-BR')}`;
  const foco = document.querySelector('input[name="foco"]:checked')?.value;
  const duracao = document.querySelector('input[name="duracao"]:checked')?.value;

  const workout = {
    id: Date.now().toString(),
    name,
    muscle: selectedMuscle,
    nivel: selectedLevel,
    foco,
    duracao,
    exercises: Array.from(selectedExercises),
    createdAt: new Date().toISOString(),
  };

  workouts.unshift(workout);
  localStorage.setItem('moveup_workouts_' + currentUser.email, JSON.stringify(workouts));
  closeModal();
  renderWorkouts();
}

function startWorkout() {
  if (!activeWorkout) return;
  window.location.href = `./treino.html?id=${activeWorkout.id}`;
}

function deleteWorkout() {
  if (!confirm(`Excluir o treino "${activeWorkout.name}"?`)) return;
  workouts = workouts.filter(w => w.id !== activeWorkout.id);
  localStorage.setItem('moveup_workouts_' + currentUser.email, JSON.stringify(workouts));
  closeModal();
  renderWorkouts();
}

init();