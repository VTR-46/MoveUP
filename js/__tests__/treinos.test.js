const { obterTopTreinos, criarTreinoDeModelo, validarTreino, filtrarPorGrupoMuscular } = require("../logica/treinos.js");

describe("Obter Top Treinos", () => {
  // VALOR LIMITE: Lista vazia
  test("Retornar lista vazia quando não há treinos", () => {
    const top5 = obterTopTreinos([], 5);
    expect(top5.length).toBe(0);
  });
});


describe("Validar Treino", () => {
  // CLASSE DE EQUIVALÊNCIA: Treino válido
  test("Treino válido deve passar", () => {
    const treino = { name: "Treino", exercises: ["Supino"] };
    const resultado = validarTreino(treino);
    expect(resultado.valido).toBe(true);
  });

  // CLASSE DE EQUIVALÊNCIA: Treino sem nome
  test("Treino incompleto deve falhar", () => {
    const treino = { exercises: ["Supino"] };
    const resultado = validarTreino(treino);
    expect(resultado.valido).toBe(false);
  });

  // VALOR LIMITE: 1 exercício (mínimo)
  test("Treino com 1 exercício deve passar", () => {
    const treino = { name: "Treino", exercises: ["Flexão"] };
    const resultado = validarTreino(treino);
    expect(resultado.valido).toBe(true);
  });

  // VALOR LIMITE: 0 exercícios (abaixo do mínimo)
  test("Treino sem exercícios deve falhar", () => {
    const treino = { name: "Treino", exercises: [] };
    const resultado = validarTreino(treino);
    expect(resultado.valido).toBe(false);
  });
});

