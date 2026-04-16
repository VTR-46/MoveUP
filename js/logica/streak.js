/**
 * Funções de lógica de streak e histórico
 * Testáveis sem DOM
 */

// Converter data para string no formato YYYY-MM-DD
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayStr(todayDate = null) {
  if (!todayDate) todayDate = todayStr();
  
  // Parse a data passada como string
  const [year, month, day] = todayDate.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

// Calcular streak (recebe arrays, não localStorage)
function calcularStreak(historico, streakData = {}, todayDate = null) {
  if (!todayDate) todayDate = todayStr();
  
  const streak = streakData || { current: 0, best: 0, lastDate: null, activeDays: [] };
  const yesterday = yesterdayStr(todayDate);
  
  // Verificar se treinou hoje
  const workedOutToday = historico.some(h => h.date && h.date.slice(0, 10) === todayDate);

  if (workedOutToday) {
    if (streak.lastDate === todayDate) {
      // Nada novo, retorna como está
      return streak;
    }

    if (streak.lastDate === yesterday) {
      // Continuou a sequência
      streak.current++;
    } else if (streak.lastDate !== todayDate) {
      // Começou nova sequência
      streak.current = 1;
    }

    streak.lastDate = todayDate;
    streak.best = Math.max(streak.best, streak.current);
    
    if (!streak.activeDays) streak.activeDays = [];
    if (!streak.activeDays.includes(todayDate)) {
      streak.activeDays.push(todayDate);
    }
  } else {
    // Não treinou hoje
    if (streak.lastDate && streak.lastDate !== todayDate && streak.lastDate !== yesterday) {
      // Perdeu a sequência
      streak.current = 0;
    }
  }

  return streak;
}

// Calcular ranking (comparar com outros usuários)
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

// Obter estatísticas básicas
function obterEstatisticas(historico, workouts) {
  const uniqueDays = new Set(historico.map(h => h.date?.slice(0, 10)).filter(Boolean));

  return {
    totalTreinos: workouts.length,
    diasAtivos: uniqueDays.size,
    totalExerciciosCompletos: historico.length
  };
}

// Exportar para Node.js/JEST
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    todayStr,
    yesterdayStr,
    calcularStreak,
    calcularRanking,
    obterEstatisticas
  };
}
