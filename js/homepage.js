function getWorkouts() {
    const user = JSON.parse(localStorage.getItem('moveup_user') || '{}');
    if (!user.email) return [];
    return JSON.parse(localStorage.getItem('moveup_workouts_' + user.email) || '[]');
}

function renderTopWorkouts() {
    const container = document.getElementById('workouts-list');
    const containerCriarTreino= document.getElementById('bt-criar');
    const workouts = getWorkouts();

    if (!workouts.length) {
        container.innerHTML = '<p class="text-sm text-gray-400 mt-2">Nenhum treino criado ainda. Crie seu primeiro treino!</p>';    /////////////
        containerCriarTreino.style.display = 'flex'

        return;
    }

    // Pega apenas os 5 primeiros treinos (índices 0 a 4)
    const top5 = workouts.slice(0, 5);

    container.innerHTML = top5.map(w => `
    <div onclick="window.location.href='./treino.html?id=${w.id}'" class="bg-white border border-gray-200 rounded-xl p-4 hover:border-brand hover:bg-blue-50 transition-all cursor-pointer flex items-center justify-between">
        <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                📋
            </div>
            <div>
                <p class="text-[15px] font-bold text-dark">${w.name}</p>
                <p class="text-[12px] text-gray-400 capitalize">${w.muscle || 'Misto'} • ${w.exercises.length} exercícios</p>
            </div>
        </div>
        <span class="text-brand font-bold text-xl">›</span>
    </div>
`).join('');
}

const TREINOS_RECOMENDADOS = [
    {
        name: "Peito e Tríceps Express",
        muscle: "peito",
        nivel: "iniciante",
        foco: "hipertrofia",
        duracao: "30",
        exercises: ["Flexão de braços", "Supino reto (barra)", "Tríceps corda no cabo"]
    },
    {
        name: "Pernas de Aço",
        muscle: "pernas",
        nivel: "intermediario",
        foco: "forca",
        duracao: "45",
        exercises: ["Agachamento livre", "Leg press", "Cadeira extensora", "Hip thrust c/ barra"]
    },
    {
        name: "Seca Barriga",
        muscle: "cardio",
        nivel: "iniciante",
        foco: "queima",
        duracao: "30",
        exercises: ["Caminhada rápida 20 min", "Prancha", "Jumping jack"]
    }


];

function renderRecommendedWorkouts() {
    const container = document.getElementById('recommended-list');

    container.innerHTML = TREINOS_RECOMENDADOS.map((w, index) => `
    <div onclick="startRecommended(${index})" class="bg-white border border-yellow-300 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden group">
        <div class="absolute top-0 right-0 bg-yellow-400 text-dark text-[10px] font-bold px-3 py-1 rounded-bl-xl">PRONTO</div>
        
        <div class="flex items-center gap-3 mb-3 mt-1">
            <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-xl">⭐</div>
            <div>
                <p class="text-[14px] font-bold text-dark leading-tight">${w.name}</p>
                <p class="text-[11px] text-gray-500 mt-0.5">${w.duracao} min • ${w.foco}</p>
            </div>
        </div>
        
        <div class="flex flex-wrap gap-1.5 mt-2">
            ${w.exercises.slice(0, 2).map(ex => `<span class="bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-1 rounded-md">${ex}</span>`).join('')}
            ${w.exercises.length > 2 ? `<span class="bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-1 rounded-md">+${w.exercises.length - 2}</span>` : ''}
        </div>
    </div>
`).join('');
}

function startRecommended(index) {
    const user = JSON.parse(localStorage.getItem('moveup_user') || '{}');
    const workouts = JSON.parse(localStorage.getItem('moveup_workouts_' + user.email) || '[]');

    // Copia o treino recomendado e cria um ID único para ele
    const novoTreino = { ...TREINOS_RECOMENDADOS[index] };
    novoTreino.id = Date.now().toString();
    novoTreino.createdAt = new Date().toISOString();

    // Salva na lista do usuário
    workouts.unshift(novoTreino);
    localStorage.setItem('moveup_workouts_' + user.email, JSON.stringify(workouts));

    // Redireciona para começar o treino
    window.location.href = './treino.html?id=' + novoTreino.id;
}

function scrollCarousel(direction) {
    const carousel = document.getElementById('carousel');
    const scrollAmount = 220;
    carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

function logout() {
    localStorage.removeItem('moveup_user');
    window.location.href = './login.html';
}

function openNewWorkoutModal() {
    // Redireciona para a página de treinos/exercícios onde o modal de fato existe
    window.location.href = './exercicios.html';
}

function init() {
    const user = JSON.parse(localStorage.getItem('moveup_user') || '{}');

    // Proteção: Se não tiver usuário logado, manda pro login
    if (!user.nome) {
        window.location.href = './login.html';
        return;
    }

    const welcomeContainer = document.querySelector('#boas-vindas');
    if (welcomeContainer) {
        const hora = new Date().getHours();
        let saudacao = "Boa noite";
    
        if (hora >= 4 && hora < 12) {
            saudacao = "Bom dia";
        } else if (hora >= 12 && hora < 18) {
            saudacao = "Boa tarde";
        }
        const h1 = welcomeContainer.querySelector('h1');
        if(h1) h1.textContent = `${saudacao}, ${user.nome}!`;
    }


    renderTopWorkouts();
    renderRecommendedWorkouts();
}

init();