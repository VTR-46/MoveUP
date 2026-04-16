const { obterTopTreinos, criarTreinoDeModelo, validarTreino, filtrarPorGrupoMuscular } = require("../logica/treinos.js");

describe("Obter Top Treinos", () => {
  test("Retornar top 5 treinos", () => {
    const treinos = Array.from({ length: 10 }, (_, i) => ({ id: i, name: `Treino ${i}` }));
    const top5 = obterTopTreinos(treinos, 5);
    expect(top5.length).toBe(5);
  });
});

describe("Criar Treino de Modelo", () => {
  test("Criar novo treino com ID único", () => {
    const modelo = { name: "Peito", exercises: ["Supino"] };
    const treino = criarTreinoDeModelo(modelo);
    expect(treino.name).toBe("Peito");
    expect(treino.id).toBeDefined();
  });
});

describe("Validar Treino", () => {
  test("Treino válido deve passar", () => {
    const treino = { name: "Treino", exercises: ["Supino"] };
    const resultado = validarTreino(treino);
    expect(resultado.valido).toBe(true);
  });

  test("Treino incompleto deve falhar", () => {
    const treino = { exercises: ["Supino"] };
    const resultado = validarTreino(treino);
    expect(resultado.valido).toBe(false);
  });
});

describe("Filtrar por Grupo Muscular", () => {
  test("Filtrar treinos por grupo", () => {
    const treinos = [
      { name: "Peito 1", muscle: "peito" },
      { name: "Pernas 1", muscle: "pernas" },
      { name: "Peito 2", muscle: "peito" }
    ];
    const filtrados = filtrarPorGrupoMuscular(treinos, "peito");
    expect(filtrados.length).toBe(2);
  });
});
