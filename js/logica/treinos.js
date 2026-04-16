function obterTopTreinos(treinos, quantidade = 5) {
  return treinos.slice(0, quantidade);
}

function criarTreinoDeModelo(modelo) {
  return {
    ...modelo,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
}

function validarTreino(treino) {
  if (!treino.name) {
    return { valido: false, erro: "Nome do treino é obrigatório." };
  }

  if (!treino.exercises || treino.exercises.length === 0) {
    return { valido: false, erro: "O treino precisa ter pelo menos um exercício." };
  }

  return { valido: true };
}

function calcularDuracao(exercicios, sets, reps) {
  const tempoBase = exercicios.length * 3;
  return Math.round(tempoBase + (sets * 2));
}

function ordenarTreinosPorData(treinos) {
  return [...treinos].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0);
    const dateB = new Date(b.createdAt || 0);
    return dateB - dateA;
  });
}

function filtrarPorGrupoMuscular(treinos, grupo) {
  return treinos.filter(t => t.muscle === grupo);
}

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
