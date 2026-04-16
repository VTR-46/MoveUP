const { validarLogin, validarCadastro } = require("../logica/usuarios.js");

describe("Validação de Login", () => {
  const usuarios = [{ email: "teste@ifsp.edu.br", senha: "senha123", nome: "Usuario" }];

  // CLASSE DE EQUIVALÊNCIA: Credenciais válidas
  test("Login com credenciais válidas deve passar", () => {
    const resultado = validarLogin("teste@ifsp.edu.br", "senha123", usuarios);
    expect(resultado.valido).toBe(true);
  });

  // CLASSE DE EQUIVALÊNCIA: Credenciais inválidas
  test("Login com email e senha incorretos deve falhar", () => {
    const resultado = validarLogin("errado@ifsp.edu.br", "senhaErrada", usuarios);
    expect(resultado.valido).toBe(false);
  });

  // VALOR LIMITE: Ambos os campos vazios
  test("Login com email e senha vazios deve falhar", () => {
    const resultado = validarLogin("", "", usuarios);
    expect(resultado.valido).toBe(false);
  });

  // CLASSE DE EQUIVALÊNCIA: Email correto mas senha errada
  test("Login com email correto e senha errada deve falhar", () => {
    const resultado = validarLogin("teste@ifsp.edu.br", "senhaErrada", usuarios);
    expect(resultado.valido).toBe(false);
  });

  // CLASSE DE EQUIVALÊNCIA: Email errado mas senha correta
  test("Login com email errado e senha correta deve falhar", () => {
    const resultado = validarLogin("errado@ifsp.edu.br", "senha123", usuarios);
    expect(resultado.valido).toBe(false);
  });

  // VALOR LIMITE: Apenas email vazio
  test("Login com apenas email vazio deve falhar", () => {
    const resultado = validarLogin("", "senha123", usuarios);
    expect(resultado.valido).toBe(false);
  });
});

describe("Validação de Cadastro", () => {
  const usuariosExistentes = [{ email: "existente@ifsp.edu.br" }];

  // CLASSE DE EQUIVALÊNCIA: Cadastro completo e válido
  test("Cadastro com todos os dados válidos deve passar", () => {
    const resultado = validarCadastro("João", "Silva", "novo@ifsp.edu.br", "senha123", []);
    expect(resultado.valido).toBe(true);
  });

  // VALOR LIMITE: 5 caracteres de senha (abaixo do mínimo)
  test("Cadastro com senha de 5 caracteres deve falhar", () => {
    const resultado = validarCadastro("João", "Silva", "novo@ifsp.edu.br", "12345", []);
    expect(resultado.valido).toBe(false);
  });

  // VALOR LIMITE: 6 caracteres de senha (no limite exato)
  test("Cadastro com senha de 6 caracteres deve passar", () => {
    const resultado = validarCadastro("João", "Silva", "novo2@ifsp.edu.br", "123456", []);
    expect(resultado.valido).toBe(true);
  });

  // CLASSE DE EQUIVALÊNCIA: Email duplicado
  test("Cadastro com email já existente deve falhar", () => {
    const resultado = validarCadastro("João", "Silva", "existente@ifsp.edu.br", "senha123", usuariosExistentes);
    expect(resultado.valido).toBe(false);
  });

  // CLASSE DE EQUIVALÊNCIA: Email inválido
  test("Cadastro com email inválido deve falhar", () => {
    const resultado = validarCadastro("João", "Silva", "emailinvalido", "senha123", []);
    expect(resultado.valido).toBe(false);
  });

  // CLASSE DE EQUIVALÊNCIA: Nome ou sobrenome vazio
  test("Cadastro sem nome deve falhar", () => {
    const resultado = validarCadastro("", "Silva", "novo@ifsp.edu.br", "senha123", []);
    expect(resultado.valido).toBe(false);
  });

  test("Cadastro sem sobrenome deve falhar", () => {
    const resultado = validarCadastro("João", "", "novo@ifsp.edu.br", "senha123", []);
    expect(resultado.valido).toBe(false);
  });
});
