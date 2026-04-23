// Funções de Streak e Calendário para a Homepage

function getStreakData(user) {
    const history = JSON.parse(localStorage.getItem('moveup_history_' + user.email) || '[]');
    let streakData = JSON.parse(localStorage.getItem('moveup_streak_' + user.email) || '{"current": 0, "best": 0, "lastDate": null, "activeDays": []}');
    
    if (typeof calcularStreak === 'function') {
        streakData = calcularStreak(history, streakData);
        localStorage.setItem('moveup_streak_' + user.email, JSON.stringify(streakData));
    }
    return streakData;
}

function toggleCalendarModal() {
    const modal = document.getElementById('calendar-modal');
    if (modal) modal.classList.toggle('hidden');
}

function updateStreakDisplay() {
    const user = JSON.parse(localStorage.getItem('moveup_user') || '{}');
    if (!user.email) return;
    const streakData = getStreakData(user);
    const streakDisplay = document.getElementById('streak-display');
    if (streakDisplay) streakDisplay.textContent = streakData.current || 0;
}

function renderStreakCalendar() {
    const container = document.getElementById('streak-mini-calendar');
    if (!container) return;
    
    const user = JSON.parse(localStorage.getItem('moveup_user') || '{}');
    if (!user.email) return;
    const streakData = getStreakData(user);
    const today = new Date();
    const weekDays = [];
    
    // Pega 6 dias antes do atual e 4 dias depois
    for (let i = -6; i <= 4; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        weekDays.push(date);
    }
    
    container.innerHTML = weekDays.map(date => {
        const dateStr = date.toISOString().split('T')[0];
        const isCompleted = streakData.activeDays && streakData.activeDays.includes(dateStr);
        const isToday = dateStr === today.toISOString().split('T')[0];
        
        const bgClass = isToday 
            ? 'bg-brand text-white ring-2 ring-brand ring-offset-2' 
            : isCompleted 
            ? 'bg-green-500 text-white' 
            : 'bg-gray-100 text-gray-500';
        
        const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
        
        return `
            <div class="flex flex-col items-center gap-1 min-w-fit">
                <div class="w-10 h-10 flex items-center justify-center rounded-lg font-semibold text-xs transition-all ${bgClass}">
                    ${isCompleted ? '✓' : date.getDate()}
                </div>
                <span class="text-[10px] font-medium text-gray-500">${dayNames[date.getDay()]}</span>
            </div>
        `;
    }).join('');
}

function renderFullCalendar() {
    const user = JSON.parse(localStorage.getItem('moveup_user') || '{}');
    if (!user.email) return;
    const streakData = getStreakData(user);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const monthTitle = document.getElementById('calendar-month-title');
    if (monthTitle) monthTitle.textContent = `${monthNames[month]} ${year}`;
    
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid) return;
    
    const days = [];
    
    for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        const isCompleted = streakData.activeDays && streakData.activeDays.includes(dateStr);
        const isCurrentMonth = date.getMonth() === month;
        const isToday = dateStr === today.toISOString().split('T')[0];
        
        const bgClass = !isCurrentMonth 
            ? 'bg-gray-50 text-gray-300' 
            : isToday 
            ? 'bg-brand text-white ring-2 ring-brand ring-offset-1' 
            : isCompleted 
            ? 'bg-green-500 text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200';
        
        days.push(`
            <div class="flex items-center justify-center w-full aspect-square rounded-lg font-semibold text-xs transition-all ${bgClass}">
                ${isCompleted && isCurrentMonth ? '✓' : date.getDate()}
            </div>
        `);
    }
    
    calendarGrid.innerHTML = days.join('');
}

// Executar as funções ao carregar a página
function initStreakElements() {
    updateStreakDisplay();
    renderStreakCalendar();
    renderFullCalendar();
}

// Chamar ao carregar
setTimeout(() => {
    initStreakElements();
}, 100);
