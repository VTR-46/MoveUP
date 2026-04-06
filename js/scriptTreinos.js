class Exercicio {
    constructor(nome, repeticoes, series, tempoDescanso, tempoEstimado, calorias, dificultade, descricao, img) {
        this.nome = nome;
        this.repeticoes = repeticoes;
        this.series = series;
        this.tempoDescanco = tempoDescanso;
        this.tempoEstimado = tempoEstimado;
        this.calorias = calorias;
        this.dificultade = dificultade;
        this.descricao = descricao;
        this.img = img;

    }
}

//TREINOS PADRONIZADOS

//                       NOME             REPETIÇOES | SERIES | TEMPO_DESCANSO(Seg) | TEMPO_ESTIMADO(Min) | CALORIAS | DIFICULDADE | DESCRIÇÃO
const ex1 = new Exercicio("Rosca Direta com Barra (bíceps)",    12, 4, 90, 8, 20, "Média", "...", "../img/IconExercicio/BicepsBarra1.png");
const ex2 = new Exercicio("Rosca Alternada com Halter",         12, 4, 90, 8, 15, "Média", "...");
const ex3 = new Exercicio("Supino Reto (peito)",                10, 4, 90, 10, 40, "Média", "...");
const ex4 = new Exercicio("Agachamento Livre",                  12, 4, 60, 12, 60, "Avançado", "...");
const ex5 = new Exercicio("Leg Press",                          12, 4, 90, 10, 50, "Média", "...");
const ex6 = new Exercicio("Corrida na Esteira",                 1, 1, 90, 20, 30, "Média", "...");
const ex7 = new Exercicio("Remada Curvada (costas)",            10, 4, 90, 10, 40, "Média", "...");