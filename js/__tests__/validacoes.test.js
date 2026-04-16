const { validarEmail, calcularForcaSenha, validarSenha } = require("../logica/validacoes.js");

describe("Validação de Email", () => {
  test("Email válido deve passar", () => {
    expect(validarEmail("usuario@example.com").valido).toBe(true);
  });

  test("Email inválido deve falhar", () => {
    expect(validarEmail("usuarioexample.com").valido).toBe(false);
  });
});

describe("Cálculo de Força de Senha", () => {
  test("Senha fraca - apenas letras", () => {
    expect(calcularForcaSenha("abc").score).toBe(1);
  });

  test("Senha média - letras + números", () => {
    expect(calcularForcaSenha("abc123").score).toBe(2);
  });

  test("Senha forte - letras maiúsculas + números + especiais", () => {
    expect(calcularForcaSenha("Abcd1234!").score).toBe(4);
  });
});

describe("Validação de Senha", () => {
  test("Senha válida deve passar", () => {
    expect(validarSenha("senha123").valido).toBe(true);
  });

  test("Senha muito curta deve falhar", () => {
    expect(validarSenha("abc").valido).toBe(false);
  });
});
