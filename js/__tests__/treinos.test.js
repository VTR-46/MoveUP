const { obterTopTreinos, criarTreinoDeModelo, validarTreino, filtrarPorGrupoMuscular } = require("../logica/treinos.js");

describe("Obter Top Treinos", () => {
  // Lista com mais treinos que o limite
  test("Retornar top 5 treinos", () => {
    const treinos = Array.from({ length: 10 }, (_, i) => ({ id: i, name: `Treino ${i}` }));
    const top5 = obterTopTreinos(treinos, 5);
    expect(top5.length).toBe(5);
  });

  // Lista com menos treinos que o limite
  test("Retornar menos items se não houver 5", () => {
    const treinos = [{ id: 1, name: "Treino 1" }, { id: 2, name: "Treino 2" }];
    const top5 = obterTopTreinos(treinos, 5);
    expect(top5.length).toBe(2);
  });

  // Lista vazia
  test("Retornar lista vazia quando não há treinos", () => {
    const top5 = obterTopTreinos([], 5);
    expect(top5.length).toBe(0);
  });
});

describe("Criar Treino de Modelo", () => {
  // Criação com sucesso
  test("Criar novo treino com ID único", () => {
    const modelo = { name: "Peito", exercises: ["Supino"] };
    const treino = criarTreinoDeModelo(modelo);
    expect(treino.name).toBe("Peito");
    expect(treino.id).toBeDefined();
    expect(typeof treino.id).toBe("string");
  });
});

describe("Validar Treino", () => {
  // Treino válido
  test("Treino válido deve passar", () => {
    const treino = { name: "Treino", exercises: ["Supino"] };
    const resultado = validarTreino(treino);
    expect(resultado.valido).toBe(true);
  });

  // Treino sem nome
  test("Treino incompleto deve falhar", () => {
    const treino = { exercises: ["Supino"] };
    const resultado = validarTreino(treino);
    expect(resultado.valido).toBe(false);
  });

  // 1 exercício (mínimo)
  test("Treino com 1 exercício deve passar", () => {
    const treino = { name: "Treino", exercises: ["Flexão"] };
    const resultado = validarTreino(treino);
    expect(resultado.valido).toBe(true);
  });

  // 0 exercícios (abaixo do mínimo)
  test("Treino sem exercícios deve falhar", () => {
    const treino = { name: "Treino", exercises: [] };
    const resultado = validarTreino(treino);
    expect(resultado.valido).toBe(false);
  });
});

describe("Filtrar por Grupo Muscular", () => {
  // Grupo que encontra resultados
  test("Filtrar treinos por grupo", () => {
    const treinos = [
      { name: "Peito 1", muscle: "peito" },
      { name: "Pernas 1", muscle: "pernas" },
      { name: "Peito 2", muscle: "peito" }
    ];
    const filtrados = filtrarPorGrupoMuscular(treinos, "peito");
    expect(filtrados.length).toBe(2);
  });

  // Grupo que não encontra resultados
  test("Filtrar por grupo que não existe retorna vazio", () => {
    const treinos = [
      { name: "Peito 1", muscle: "peito" },
      { name: "Pernas 1", muscle: "pernas" }
    ];
    const filtrados = filtrarPorGrupoMuscular(treinos, "costas");
    expect(filtrados.length).toBe(0);
  });
});
