const { validarLogin, validarCadastro } = require("../logica/usuarios.js");

describe("Validação de Login", () => {
  const usuarios = [{ email: "teste@ifsp.edu.br", senha: "senha123", nome: "Usuario" }];

  // Credenciais válidas
  test("Login com credenciais válidas deve passar", () => {
    const resultado = validarLogin("teste@ifsp.edu.br", "senha123", usuarios);
    expect(resultado.valido).toBe(true);
  });

  // Credenciais inválidas
  test("Login com email e senha incorretos deve falhar", () => {
    const resultado = validarLogin("errado@ifsp.edu.br", "senhaErrada", usuarios);
    expect(resultado.valido).toBe(false);
  });

  // Ambos os campos vazios
  test("Login com email e senha vazios deve falhar", () => {
    const resultado = validarLogin("", "", usuarios);
    expect(resultado.valido).toBe(false);
  });

  // Email correto mas senha errada
  test("Login com email correto e senha errada deve falhar", () => {
    const resultado = validarLogin("teste@ifsp.edu.br", "senhaErrada", usuarios);
    expect(resultado.valido).toBe(false);
  });

  // Email errado mas senha correta
  test("Login com email errado e senha correta deve falhar", () => {
    const resultado = validarLogin("errado@ifsp.edu.br", "senha123", usuarios);
    expect(resultado.valido).toBe(false);
  });

  // Apenas email vazio
  test("Login com apenas email vazio deve falhar", () => {
    const resultado = validarLogin("", "senha123", usuarios);
    expect(resultado.valido).toBe(false);
  });
});

describe("Validação de Cadastro", () => {
  const usuariosExistentes = [{ email: "existente@ifsp.edu.br" }];

  // Cadastro completo e válido
  test("Cadastro com todos os dados válidos deve passar", () => {
    const resultado = validarCadastro("João", "Silva", "novo@ifsp.edu.br", "senha123", []);
    expect(resultado.valido).toBe(true);
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
