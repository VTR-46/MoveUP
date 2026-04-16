const PREDEFINED_VIDEOS = {
  'Supino reto (barra)': 'rT7DgCr-3pg',
  'Flexão de braços': 'IODxDxX7oi4',
  'Agachamento livre': 'MVMNK0ncDPk',
  'Barra fixa': 'eGo4IYcbEPI',
  'Prancha': 'pSHjTRCQxIw',
  'Desenvolvimento militar': '2yjwXTZep3c',
  'Rosca direta c/ barra': 'ykJmrZ5v0Oo',
  'Tríceps corda no cabo': 'vB5OHsJ3EME',
  'Hip thrust c/ barra': 'xDoeTWA2ttM',
  'Levantamento terra': '_z-ea42C2M',
  'Remada curvada c/ halteres': '6-zGprY-s4A',
  'Elevação lateral c/ halteres': '34JTCfdJ2eE',
  'Rosca Scott': 'jJ8o0OU_n3U',
  'Tríceps testa': '1tr1c_A3o1U',
  'Avanço c/ halteres': 'D7KaRcUTQeE',
  'Ponte de glúteo': 'Zp26q4i_SoY',
  'Crunch básico': 'Xyd_fa5zoEU',
  'Burpee': 'tJrdJBWBu08',
  'Agachamento c/ barra': 'MVMNK0ncDPk',
  'Cadeira extensora': 'YyvSfVjQeL0',
  'Leg press': 'GvRgijoJ2xY'
};

const SETS_CONFIG = { hipertrofia: 4, forca: 5, resistencia: 3, queima: 3 };
const REPS_CONFIG = {
  hipertrofia: '10-12 reps',
  forca: '4-6 reps',
  resistencia: '15-20 reps',
  queima: '15 reps'
};

const ISOMETRIC_EXERCISES = new Set([
  'Prancha',
  'Prancha lateral',
  'Hollow body hold',
  'Ponte de glúteo'
]);

const TIPS = [
  'Mantenha a respiracao controlada durante todo o movimento.',
  'Foque na contracao muscular no pico da tensao.',
  'Controle a fase de descida — o movimento excentrico e crucial.',
  'Mantenha a coluna neutra durante o exercicio.',
  'Hidrate-se entre as series para manter o desempenho.',
  'Mantenha os joelhos alinhados com os pes durante agachamentos.',
  'Evite usar momentum — priorize a qualidade do movimento.',
  'Respire fundo antes de iniciar o movimento principal.',
];
const EX_DESCRIPTIONS = {
  'Supino reto (barra)': 'Deite no banco com os pes apoiados no chao. Segure a barra com pegada um pouco mais larga que os ombros. Desca a barra ate tocar levemente o peito e empurre de volta ao ponto inicial, contraindo o peitoral.',
  'Flexao de bracos': 'Em posicao de prancha alta, maos ligeiramente mais largas que os ombros. Desca o corpo ate o peito quase tocar o chao, mantendo o corpo reto. Empurre de volta com forca, expirando no esforco.',
  'Agachamento c/ barra': 'Posicione a barra sobre os trapezios. Com os pes na largura dos ombros, desca ate as coxas ficarem paralelas ao chao. Mantenha o peito erguido, joelhos alinhados com os pes e a coluna neutra.',
  'Barra fixa': 'Segure a barra com pegada prona, maos um pouco mais largas que os ombros. Puxe o corpo para cima ate o queixo ultrapassar a barra. Desca de forma controlada ate os cotovelos ficarem completamente estendidos.',
  'Desenvolvimento militar': 'Sentado ou em pe, segure os halteres ou barra na altura dos ombros. Empurre para cima ate os bracos ficarem quase estendidos, sem travar os cotovelos. Desca de forma controlada.',
  'Rosca direta c/ barra': 'Em pe, segure a barra com pegada supinada na largura dos ombros. Mantendo os cotovelos fixos ao lado do corpo, flexione os antebracos ate a barra chegar na altura dos ombros. Desca de forma controlada.',
  'Triceps corda no cabo': 'Posicione-se de frente para o cabo alto. Segure a corda com as duas maos, cotovelos dobrados a 90 graus. Extenda os antebracos para baixo abrindo a corda no final do movimento. Controle na subida.',
  'Hip thrust c/ barra': 'Apoia os ombros num banco, barra sobre o quadril. Com os pes apoiados no chao, empurre o quadril para cima contraindo os gluteos no topo. Desca lentamente e repita.',
  'Prancha': 'Apoie os antebracos no chao com os cotovelos abaixo dos ombros. Mantenha o corpo em linha reta da cabeca aos pes, contraindo o abdomen e gluteos. Respire normalmente durante o tempo estipulado.',
};

function getDesc(name) {
  return EX_DESCRIPTIONS[name] || 'Execute o movimento com amplitude completa, controlando tanto a fase concentrica quanto a excentrica. Mantenha a postura correta durante toda a execucao para maximizar os resultados e prevenir lesoes.';
}

const params = new URLSearchParams(window.location.search);
const workoutId = params.get('id');
const currentUser = JSON.parse(localStorage.getItem('moveup_user') || '{}');

if (!currentUser.email) {
  window.location.href = './login.html';
}

const workouts = JSON.parse(localStorage.getItem('moveup_workouts_' + currentUser.email) || '[]');
const workout = workouts.find(w => w.id === workoutId);

if (!workout) {
  window.location.href = './exercicios.html';
}

const FOCUS_LABEL = { hipertrofia: 'Hipertrofia', forca: 'Forca', resistencia: 'Resistencia', queima: 'Queima de gordura' };
const NIVEL_LABEL = { iniciante: 'Iniciante', intermediario: 'Intermediario', avancado: 'Avancado' };

let currentExIdx = 0;
let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;
let restInterval = null;
const REST_DURATION = 60;
let seriesTotal = 0;
let seriesDone = 0;
let completedSeries = [];
let workoutStartTime = Date.now();
let totalSeriesCompleted = 0;

function initPage() {
  document.getElementById('workout-name-display').textContent = workout.name;
  document.getElementById('workout-meta-display').textContent =
    `${FOCUS_LABEL[workout.foco] || workout.foco} · ${workout.duracao} min · ${NIVEL_LABEL[workout.nivel] || workout.nivel}`;

  seriesTotal = SETS_CONFIG[workout.foco] || 3;
  completedSeries = workout.exercises.map(() => 0);

  renderSidebar();
  loadExercise(0);
  updateOverall();
}

function renderSidebar() {
  const container = document.getElementById('exercises-sidebar');
  container.innerHTML = workout.exercises.map((ex, i) => {
    const done = completedSeries[i] >= seriesTotal;
    const active = i === currentExIdx;
    let firstUncompleted = completedSeries.findIndex(c => c < seriesTotal);
  if (firstUncompleted === -1) {
    firstUncompleted = workout.exercises.length - 1;
  }
    const locked = i > firstUncompleted;
    
    let classes = "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors border border-transparent";
    let numClasses = "w-7 h-7 rounded-lg flex items-center justify-center text-[12px] font-bold border";
    
    if (locked) {
      classes += " opacity-50 cursor-not-allowed";
      numClasses += " bg-gray-100 text-gray-400 border-gray-200";
    } else if (active) {
      classes += " bg-blue-50 border-brand/20";
      numClasses += " bg-brand text-white border-brand";
    } else if (done) {
      classes += " opacity-60";
      numClasses += " bg-green-500 text-white border-green-500";
    } else {
      classes += " hover:bg-gray-50";
      numClasses += " bg-white text-gray-500 border-gray-200";
    }
    
    return `<div class="${classes}" id="sidebar-item-${i}" onclick="${locked ? '' : `jumpToExercise(${i})`}">
      <div class="${numClasses}">${done ? '<svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5l3 3 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : (i + 1)}</div>
      <div class="flex-1 overflow-hidden">
        <p class="text-[13px] font-semibold text-dark truncate leading-tight mb-0.5">${ex}</p>
        <p class="text-[11px] text-gray-400 font-medium">${completedSeries[i]}/${seriesTotal} séries</p>
      </div>
    </div>`;
  }).join('');
  document.getElementById('side-counter').textContent = `${completedSeries.filter((c, i) => c >= seriesTotal).length}/${workout.exercises.length}`;
}

function loadExercise(idx) {
  currentExIdx = idx;
  const name = workout.exercises[idx];

  document.getElementById('ex-name-display').textContent = name;
  document.getElementById('ex-sets-display').textContent =
    `${seriesTotal} series x ${REPS_CONFIG[workout.foco] || '12 reps'}`;
  document.getElementById('ex-desc-display').textContent = getDesc(name);
  document.getElementById('tip-text').textContent = TIPS[idx % TIPS.length];

  const isIsometric = ISOMETRIC_EXERCISES.has(name);
  const repTargetSection = document.getElementById('rep-target-section');
  const timerSection = document.getElementById('timer-section');

  repTargetSection.classList.toggle('hidden', isIsometric);
  timerSection.classList.toggle('hidden', !isIsometric);

  if (!isIsometric) {
    document.getElementById('rep-target-display').textContent = REPS_CONFIG[workout.foco] || '12 reps';
  }

  seriesDone = completedSeries[idx];
  timerSeconds = 0;
  timerRunning = false;
  clearInterval(timerInterval);

  renderSetsRow();
  updateTimerDisplay();
  checkExerciseDone();
  loadVideoForExercise(name);
  renderSidebar();
  updateOverall();
}

function renderSetsRow() {
  const row = document.getElementById('sets-row');
  row.innerHTML = Array.from({ length: seriesTotal }, (_, i) => {
    let baseCls = "w-10 h-10 rounded-xl border-2 flex items-center justify-center text-[13px] font-bold transition-all";
    if (i < seriesDone) {
      baseCls += " bg-green-500 border-green-500 text-white";
    } else if (i === seriesDone) {
      baseCls += " bg-blue-50 border-brand text-brand";
    } else {
      baseCls += " bg-transparent border-gray-200 text-gray-400";
    }
    
    return `<div class="${baseCls}">${i + 1}</div>`;
  }).join('');
  document.getElementById('set-tracker-title').textContent =
    seriesDone >= seriesTotal ? 'Todas as séries concluídas' : `Série ${seriesDone + 1} de ${seriesTotal}`;
}

function checkExerciseDone() {
  const done = seriesDone >= seriesTotal;
  document.getElementById('btn-complete-set').classList.toggle('hidden', done);
  document.getElementById('btn-next-ex').classList.toggle('hidden', !done);
  const isLast = currentExIdx >= workout.exercises.length - 1;
  document.getElementById('btn-next-ex').textContent = isLast ? 'Finalizar treino' : 'Próximo exercício';
}

function completeSerie() {
  if (seriesDone >= seriesTotal) {
    return;
  }
  seriesDone++;
  completedSeries[currentExIdx] = seriesDone;
  totalSeriesCompleted++;

  renderSetsRow();
  checkExerciseDone();
  renderSidebar();

  if (seriesDone < seriesTotal) {
    startRestTimer();
  } else {
    clearInterval(timerInterval);
    timerRunning = false;
  }
}

function nextExercise() {
  const next = currentExIdx + 1;
  if (next >= workout.exercises.length) {
    const allDone = completedSeries.every(c => c >= seriesTotal);
    if (!allDone) {
      showToast('Conclua todos os exercícios antes de finalizar!');
      return;
    }
    finishWorkout();
    return;
  }
  loadExercise(next);
  const sidebar = document.getElementById('exercises-sidebar');
  const item = document.getElementById(`sidebar-item-${next}`);
  if (item) {
    item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function jumpToExercise(idx) {
  let firstUncompleted = completedSeries.findIndex(c => c < seriesTotal);
  if (firstUncompleted === -1) {
    firstUncompleted = workout.exercises.length - 1;
  }
  if (idx > firstUncompleted) {
    showToast('Conclua os exercícios anteriores primeiro!');
    return;
  }
  loadExercise(idx);
}

function updateOverall() {
  const done = completedSeries.filter((c, i) => c >= seriesTotal).length;
  const total = workout.exercises.length;
  const pct = Math.round((done / total) * 100);
  document.getElementById('overall-bar').style.width = pct + '%';
  document.getElementById('overall-label').textContent = `${done} / ${total}`;
}

function toggleTimer() {
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById('btn-timer-toggle').textContent = 'Retomar';
    document.getElementById('timer-display').classList.remove('text-brand');
  } else {
    timerRunning = true;
    document.getElementById('btn-timer-toggle').textContent = 'Pausar';
    document.getElementById('timer-display').classList.add('text-brand');
    timerInterval = setInterval(() => {
      timerSeconds++;
      updateTimerDisplay();
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  timerSeconds = 0;
  document.getElementById('btn-timer-toggle').textContent = 'Iniciar';
  document.getElementById('timer-display').classList.remove('text-brand');
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const m = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
  const s = String(timerSeconds % 60).padStart(2, '0');
  document.getElementById('timer-display').textContent = `${m}:${s}`;
}

function loadVideoForExercise(name) {
  const vid = PREDEFINED_VIDEOS[name] || null;
  const iframe = document.getElementById('video-iframe');
  const placeholder = document.getElementById('video-placeholder');

  if (vid) {
    iframe.src = `https://www.youtube.com/embed/${vid}?rel=0&modestbranding=1&playsinline=1`;
    iframe.classList.remove('hidden');
    placeholder.classList.add('hidden');
  } else {
    iframe.src = '';
    iframe.classList.add('hidden');
    placeholder.classList.remove('hidden');
  }
}

function finishWorkout() {
  clearInterval(timerInterval);
  const elapsed = Math.round((Date.now() - workoutStartTime) / 60000);

  const key = 'moveup_history_' + currentUser.email;
  const history = JSON.parse(localStorage.getItem(key) || '[]');
  history.unshift({
    workoutId: workout.id,
    name: workout.name,
    date: new Date().toISOString(),
    exercises: workout.exercises.length,
    series: totalSeriesCompleted,
    minutes: elapsed,
  });
  localStorage.setItem(key, JSON.stringify(history.slice(0, 50)));

  document.getElementById('active-view').classList.add('hidden');
  document.getElementById('done-screen').classList.remove('hidden');
  document.getElementById('done-screen').classList.add('flex');
  document.getElementById('done-sub').textContent =
    `Você completou "${workout.name}" com sucesso. Excelente trabalho!`;
  document.getElementById('done-exercises').textContent = workout.exercises.length;
  document.getElementById('done-sets').textContent = totalSeriesCompleted;
  document.getElementById('done-time').textContent = elapsed || 1;

  showToast('Treino salvo no seu histórico!');
}

function startRestTimer() {
  const restOverlay = document.getElementById('rest-overlay');
  const restTimerDisplay = document.getElementById('rest-timer');
  const btnSkipRest = document.getElementById('btn-skip-rest');

  restOverlay.classList.remove('hidden');
  btnSkipRest.onclick = endRest;

  let restSeconds = REST_DURATION;

  const updateRestTimerDisplay = () => {
    const m = String(Math.floor(restSeconds / 60)).padStart(2, '0');
    const s = String(restSeconds % 60).padStart(2, '0');
    restTimerDisplay.textContent = `${m}:${s}`;
  };

  updateRestTimerDisplay();

  restInterval = setInterval(() => {
    restSeconds--;
    updateRestTimerDisplay();
    if (restSeconds <= 0) endRest();
  }, 1000);
}

function endRest() {
  clearInterval(restInterval);
  document.getElementById('rest-overlay').classList.add('hidden');
  resetTimer();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

initPage();