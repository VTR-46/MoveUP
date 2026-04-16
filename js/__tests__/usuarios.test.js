const { validarLogin, validarCadastro } = require("../logica/usuarios.js");

describe("Validação de Login", () => {
  test("Login valid - deve passar", () => {
    const users = [
      { email: "test@example.com", senha: "password123", nome: "Teste" }
    ];
    const resultado = validarLogin("test@example.com", "password123", users);
    expect(resultado.valido).toBe(true);
  });

  test("Login invalid - deve falhar", () => {
    const users = [
      { email: "test@example.com", senha: "password123", nome: "Teste" }
    ];
    const resultado = validarLogin("wrong@example.com", "wrongpass", users);
    expect(resultado.valido).toBe(false);
  });

  test("Login com campos vazios - deve falhar", () => {
    const resultado = validarLogin("", "", []);
    expect(resultado.valido).toBe(false);
  });
});

describe("Validação de Cadastro", () => {
  test("Cadastro válido - deve passar", () => {
    const resultado = validarCadastro("João", "Silva", "joao@example.com", "senha123", []);
    expect(resultado.valido).toBe(true);
  });

  test("Cadastro sem dados - deve falhar", () => {
    const resultado = validarCadastro("", "", "invalid", "12", []);
    expect(resultado.valido).toBe(false);
  });

  test("Cadastro com email duplicado - deve falhar", () => {
    const users = [{ email: "joao@example.com" }];
    const resultado = validarCadastro("João", "Silva", "joao@example.com", "senha123", users);
    expect(resultado.valido).toBe(false);
  });
});
