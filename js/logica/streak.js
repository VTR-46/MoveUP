function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayStr(todayDate = null) {
  if (!todayDate) todayDate = todayStr();
  
  const [year, month, day] = todayDate.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function calcularStreak(historico, streakData = {}, todayDate = null) {
  if (!todayDate) todayDate = todayStr();
  
  const streak = streakData || { current: 0, best: 0, lastDate: null, activeDays: [] };
  const yesterday = yesterdayStr(todayDate);
  
  const workedOutToday = historico.some(h => h.date && h.date.slice(0, 10) === todayDate);

  if (workedOutToday) {
    if (streak.lastDate === todayDate) {
      return streak;
    }

    if (streak.lastDate === yesterday) {
      streak.current++;
    } else if (streak.lastDate !== todayDate) {
      streak.current = 1;
    }

    streak.lastDate = todayDate;
    streak.best = Math.max(streak.best, streak.current);
    
    if (!streak.activeDays) streak.activeDays = [];
    if (!streak.activeDays.includes(todayDate)) {
      streak.activeDays.push(todayDate);
    }
  } else {
    if (streak.lastDate && streak.lastDate !== todayDate && streak.lastDate !== yesterday) {
      streak.current = 0;
    }
  }

  return streak;
}

function calcularRanking(meuStreak, todosUsuarios, meuEmail) {
  let posicao = 1;

  todosUsuarios.forEach(u => {
    if (u.email === meuEmail) return;
    if (u.streak && u.streak.current > meuStreak) {
      posicao++;
    }
  });

  return posicao;
}

function obterEstatisticas(historico, workouts) {
  const uniqueDays = new Set(historico.map(h => h.date?.slice(0, 10)).filter(Boolean));

  return {
    totalTreinos: workouts.length,
    diasAtivos: uniqueDays.size,
    totalExerciciosCompletos: historico.length
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    todayStr,
    yesterdayStr,
    calcularStreak,
    calcularRanking,
    obterEstatisticas
  };
}
