const { validarEmail, calcularForcaSenha, validarSenha } = require("../logica/validacoes.js");

describe("Validação de Email", () => {
  // CLASSE DE EQUIVALÊNCIA: Email válido
  test("Email com formato correto deve passar", () => {
    expect(validarEmail("usuario@ifsp.edu.br").valido).toBe(true);
  });

  // VALOR LIMITE: Email sem @
  test("Email sem @ deve falhar", () => {
    expect(validarEmail("usuarioifsp.edu.br").valido).toBe(false);
  });

  // CLASSE DE EQUIVALÊNCIA: Email vazio
  test("Email vazio deve falhar", () => {
    expect(validarEmail("").valido).toBe(false);
  });
});

describe("Validação de Senha", () => {
  // VALOR LIMITE: 5 caracteres (abaixo do mínimo)
  test("Senha com 5 caracteres deve falhar", () => {
    expect(validarSenha("12345").valido).toBe(false);
  });

  // VALOR LIMITE: 6 caracteres (no limite exato)
  test("Senha com 6 caracteres deve passar", () => {
    expect(validarSenha("123456").valido).toBe(true);
  });

  // VALOR LIMITE: 7 caracteres (acima do limite)
  test("Senha com 7 caracteres deve passar", () => {
    expect(validarSenha("1234567").valido).toBe(true);
  });
});

describe("Cálculo de Força de Senha", () => {
  // CLASSE DE EQUIVALÊNCIA: Muito fraca (apenas letras minúsculas)
  test("Senha apenas com minúsculas = score 1", () => {
    expect(calcularForcaSenha("abc").score).toBe(1);
  });

  // VALOR LIMITE: 8 caracteres (mínimo para score aumentar)
  test("Senha com 8 caracteres minúsculos = score 2", () => {
    expect(calcularForcaSenha("abcdefgh").score).toBe(2);
  });

  // CLASSE DE EQUIVALÊNCIA: Forte (com maiúscula + número + 8 caracteres)
  test("Senha com maiúscula, número e 8+ chars = score 4", () => {
    expect(calcularForcaSenha("Abcd1234").score).toBe(4);
  });
});
