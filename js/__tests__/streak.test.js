const { calcularStreak, calcularRanking, obterEstatisticas } = require("../logica/streak.js");

describe("Cálculo de Streak", () => {

  test("Primeira vez que treinou - streak = 1", () => {
    const historico = [
      { date: "2026-04-15T10:00:00Z" }
    ];
    const streak = calcularStreak(historico, { current: 0, best: 0, lastDate: null }, "2026-04-15");
    expect(streak.current).toBe(1);
    expect(streak.best).toBe(1);
  });

  test("Continuou sequência - streak aumenta", () => {
    const historico = [
      { date: "2026-04-15T10:00:00Z" }
    ];
    const streakAnterior = { current: 3, best: 3, lastDate: "2026-04-14", activeDays: ["2026-04-12", "2026-04-13", "2026-04-14"] };
    const streak = calcularStreak(historico, streakAnterior, "2026-04-15");
    expect(streak.current).toBe(4);
    expect(streak.best).toBe(4);
  });

  test("Não treinou - mantém streak anterior", () => {
    const historico = [];
    const streakAnterior = { current: 5, best: 5, lastDate: "2026-04-13" };
    const streak = calcularStreak(historico, streakAnterior, "2026-04-15");
    expect(streak.current).toBe(0);
  });

  test("Treinou múltiplas vezes no mesmo dia - conta como 1 dia", () => {
    const historico = [
      { date: "2026-04-15T08:00:00Z" },
      { date: "2026-04-15T15:00:00Z" }
    ];
    const streak = calcularStreak(historico, { current: 0, best: 0, lastDate: null }, "2026-04-15");
    expect(streak.current).toBe(1);
    expect(streak.activeDays.length).toBe(1);
  });

});

describe("Cálculo de Ranking", () => {

  test("Ser o melhor entre 3 usuários", () => {
    const usuarios = [
      { email: "user1@example.com", streak: { current: 10 } },
      { email: "user2@example.com", streak: { current: 5 } },
      { email: "user3@example.com", streak: { current: 3 } }
    ];
    const ranking = calcularRanking(10, usuarios, "user1@example.com");
    expect(ranking).toBe(1);
  });

  test("Estar em 2º lugar", () => {
    const usuarios = [
      { email: "user1@example.com", streak: { current: 15 } },
      { email: "user2@example.com", streak: { current: 10 } },
      { email: "user3@example.com", streak: { current: 8 } }
    ];
    const ranking = calcularRanking(10, usuarios, "user2@example.com");
    expect(ranking).toBe(2);
  });

});

describe("Obter Estatísticas", () => {

  test("Calcular estatísticas com múltiplos treinos e dias", () => {
    const historico = [
      { date: "2026-04-15T10:00:00Z" },
      { date: "2026-04-15T15:00:00Z" },
      { date: "2026-04-14T10:00:00Z" }
    ];
    const workouts = [
      { id: "1", name: "Treino 1" },
      { id: "2", name: "Treino 2" }
    ];
    const stats = obterEstatisticas(historico, workouts);
    expect(stats.totalTreinos).toBe(2);
    expect(stats.diasAtivos).toBe(2);
    expect(stats.totalExerciciosCompletos).toBe(3);
  });

});
