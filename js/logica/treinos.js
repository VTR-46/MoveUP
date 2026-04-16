/**
 * Funções de lógica de treinos
 * Testáveis sem DOM
 */

// Filtrar top N treinos
function obterTopTreinos(treinos, quantidade = 5) {
  return treinos.slice(0, quantidade);
}

// Criar novo treino baseado em modelo recomendado
function criarTreinoDeModelo(modelo) {
  return {
    ...modelo,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
}

// Validar dados do treino
function validarTreino(treino) {
  if (!treino.name) {
    return { valido: false, erro: "Nome do treino é obrigatório." };
  }

  if (!treino.exercises || treino.exercises.length === 0) {
    return { valido: false, erro: "O treino precisa ter pelo menos um exercício." };
  }

  return { valido: true };
}

// Calcular duração estimada do treino
function calcularDuracao(exercicios, sets, reps) {
  // Estimativa: ~3 min por exercício considerando sets e reps
  const tempoBase = exercicios.length * 3;
  return Math.round(tempoBase + (sets * 2));
}

// Ordenar treinos por data (mais recente primeiro)
function ordenarTreinosPorData(treinos) {
  return [...treinos].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0);
    const dateB = new Date(b.createdAt || 0);
    return dateB - dateA;
  });
}

// Filtrar treinos por grupo muscular
function filtrarPorGrupoMuscular(treinos, grupo) {
  return treinos.filter(t => t.muscle === grupo);
}

// Exportar para Node.js/JEST
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    obterTopTreinos,
    criarTreinoDeModelo,
    validarTreino,
    calcularDuracao,
    ordenarTreinosPorData,
    filtrarPorGrupoMuscular
  };
}
