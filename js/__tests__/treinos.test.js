const { obterTopTreinos, criarTreinoDeModelo, validarTreino, filtrarPorGrupoMuscular } = require("../logica/treinos.js");

describe("Obter Top Treinos", () => {

  test("Retornar top 5 treinos de uma lista com 10", () => {
    const treinos = Array.from({ length: 10 }, (_, i) => ({ id: i, name: `Treino ${i}` }));
    const top5 = obterTopTreinos(treinos, 5);
    expect(top5.length).toBe(5);
    expect(top5[0].id).toBe(0);
  });

  test("Retornar menos items se não houver 5", () => {
    const treinos = [{ id: 1, name: "Treino 1" }, { id: 2, name: "Treino 2" }];
    const top5 = obterTopTreinos(treinos, 5);
    expect(top5.length).toBe(2);
  });

});

describe("Criar Treino de Modelo", () => {

  test("Criar novo treino baseado em modelo com ID único", () => {
    const modelo = {
      name: "Peito",
      muscle: "peito",
      exercises: ["Supino", "Flexão"]
    };
    const treino = criarTreinoDeModelo(modelo);
    expect(treino.name).toBe("Peito");
    expect(treino.id).toBeDefined();
    expect(treino.createdAt).toBeDefined();
  });

});

describe("Validar Treino", () => {

  test("Treino válido deve passar", () => {
    const treino = {
      name: "Treino Completo",
      exercises: ["Supino", "Rosca"]
    };
    const resultado = validarTreino(treino);
    expect(resultado.valido).toBe(true);
  });

  test("Treino sem nome deve falhar", () => {
    const treino = {
      exercises: ["Supino"]
    };
    const resultado = validarTreino(treino);
    expect(resultado.valido).toBe(false);
  });

  test("Treino sem exercícios deve falhar", () => {
    const treino = {
      name: "Treino Vazio",
      exercises: []
    };
    const resultado = validarTreino(treino);
    expect(resultado.valido).toBe(false);
  });

});

describe("Filtrar por Grupo Muscular", () => {

  test("Filtrar treinos por grupo peito", () => {
    const treinos = [
      { name: "Peito 1", muscle: "peito" },
      { name: "Pernas 1", muscle: "pernas" },
      { name: "Peito 2", muscle: "peito" }
    ];
    const filtrados = filtrarPorGrupoMuscular(treinos, "peito");
    expect(filtrados.length).toBe(2);
    expect(filtrados.every(t => t.muscle === "peito")).toBe(true);
  });

});
