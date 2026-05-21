const { obterTopTreinos, criarTreinoDeModelo, validarTreino, filtrarPorGrupoMuscular } = require("../logica/treinos.js");
const { validarLogin, validarCadastro } = require("../logica/usuarios.js");
const { validarEmail, calcularForcaSenha, validarSenha } = require("../logica/validacoes.js");

describe("Obter Top Treinos", () => {
  test("Retornar lista vazia quando não há treinos", () => {
    const top5 = obterTopTreinos([], 5);
    expect(top5.length).toBe(0);
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

  test("Treino com 1 exercício deve passar", () => {
    const treino = { name: "Treino", exercises: ["Flexão"] };
    const resultado = validarTreino(treino);
    expect(resultado.valido).toBe(true);
  });

  test("Treino sem exercícios deve falhar", () => {
    const treino = { name: "Treino", exercises: [] };
    const resultado = validarTreino(treino);
    expect(resultado.valido).toBe(false);
  });
});

describe("Validação de Login", () => {
  const usuarios = [{ email: "teste@ifsp.edu.br", senha: "senha123", nome: "Usuario" }];

  test("Login com credenciais válidas deve passar", () => {
    const resultado = validarLogin("teste@ifsp.edu.br", "senha123", usuarios);
    expect(resultado.valido).toBe(true);
  });

  test("Login com email e senha incorretos deve falhar", () => {
    const resultado = validarLogin("errado@ifsp.edu.br", "senhaErrada", usuarios);
    expect(resultado.valido).toBe(false);
  });

  test("Login com email e senha vazios deve falhar", () => {
    const resultado = validarLogin("", "", usuarios);
    expect(resultado.valido).toBe(false);
  });

  test("Login com email correto e senha errada deve falhar", () => {
    const resultado = validarLogin("teste@ifsp.edu.br", "senhaErrada", usuarios);
    expect(resultado.valido).toBe(false);
  });

  test("Login com email errado e senha correta deve falhar", () => {
    const resultado = validarLogin("errado@ifsp.edu.br", "senha123", usuarios);
    expect(resultado.valido).toBe(false);
  });

  test("Login com apenas email vazio deve falhar", () => {
    const resultado = validarLogin("", "senha123", usuarios);
    expect(resultado.valido).toBe(false);
  });
});

describe("Validação de Cadastro", () => {
  const usuariosExistentes = [{ email: "existente@ifsp.edu.br" }];

  test("Cadastro com todos os dados válidos deve passar", () => {
    const resultado = validarCadastro("João", "Silva", "novo@ifsp.edu.br", "senha123", []);
    expect(resultado.valido).toBe(true);
  });

  test("Cadastro sem nome deve falhar", () => {
    const resultado = validarCadastro("", "Silva", "novo@ifsp.edu.br", "senha123", []);
    expect(resultado.valido).toBe(false);
  });

  test("Cadastro sem sobrenome deve falhar", () => {
    const resultado = validarCadastro("João", "", "novo@ifsp.edu.br", "senha123", []);
    expect(resultado.valido).toBe(false);
  });
});

describe("Validação de Email", () => {
  test("Email com formato correto deve passar", () => {
    expect(validarEmail("usuario@ifsp.edu.br").valido).toBe(true);
  });

  test("Email vazio deve falhar", () => {
    expect(validarEmail("").valido).toBe(false);
  });
});

describe("Validação de Senha", () => {
  test("Senha com 5 caracteres deve falhar", () => {
    expect(validarSenha("12345").valido).toBe(false);
  });

  test("Senha com 6 caracteres deve passar", () => {
    expect(validarSenha("123456").valido).toBe(true);
  });
});

describe("Cálculo de Força de Senha", () => {
  test("Senha apenas com minúsculas = score 1", () => {
    expect(calcularForcaSenha("abc").score).toBe(1);
  });

  test("Senha com maiúscula, número e 8+ chars = score 4", () => {
    expect(calcularForcaSenha("Abcd1234").score).toBe(4);
  });
});
