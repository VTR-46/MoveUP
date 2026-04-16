const { buscar, validarEmail, calcularForcaSenha, validarNome, validarSenha, validarUsername } = require("../logica/validacoes.js");

describe("Função buscar - Buscar caractere na cadeia", () => {
  
  test("AVL tamanho inferior ao limite 0", () => {
    expect(buscar(0, "a", "a")).toBe("entre com um inteiro entre 1 e 20");
  });

  test("AVL tamanho no limite inferior 1", () => {
    expect(buscar(1, "a", "a")).toBe("o caractere a aparece na posição 1 da cadeia");
  });

  test("AVL tamanho no limite superior 20", () => {
    expect(buscar(20, "abcdefghijklmnopqrst", "t")).toBe("o caractere t aparece na posição 20 da cadeia");
  });

  test("AVL tamanho superior ao limite 21", () => {
    expect(buscar(21, "abcdefghijklmnopqrstu", "a")).toBe("entre com um inteiro entre 1 e 20");
  });

  test("CE caractere presente na cadeia", () => {
    expect(buscar(5, "teste", "s")).toBe("o caractere s aparece na posição 3 da cadeia");
  });

  test("CE caractere ausente da cadeia", () => {
    expect(buscar(5, "teste", "z")).toBe("o caractere z não pertence à cadeia");
  });

  test("CE primeira ocorrencia do caractere repetido", () => {
    expect(buscar(4, "bola", "b")).toBe("o caractere b aparece na posição 1 da cadeia");
  });

});

describe("Validação de Email", () => {

  test("Email válido deve passar", () => {
    const resultado = validarEmail("usuario@example.com");
    expect(resultado.valido).toBe(true);
  });

  test("Email sem arroba deve falhar", () => {
    const resultado = validarEmail("usuarioexample.com");
    expect(resultado.valido).toBe(false);
  });

  test("Email vazio deve falhar", () => {
    const resultado = validarEmail("");
    expect(resultado.valido).toBe(false);
  });

});

describe("Cálculo de Força de Senha", () => {

  test("Senha fraca - apenas letras", () => {
    const resultado = calcularForcaSenha("abc");
    expect(resultado.score).toBe(1);
  });

  test("Senha média - letras + números + minúsculas", () => {
    const resultado = calcularForcaSenha("abc123");
    expect(resultado.score).toBe(2);
  });

  test("Senha forte - letras maiúsculas + números + especiais", () => {
    const resultado = calcularForcaSenha("Abcd1234!");
    expect(resultado.score).toBe(4);
  });

  test("Senha muito fraca - vazia", () => {
    const resultado = calcularForcaSenha("");
    expect(resultado.label).toBe("");
  });

});

describe("Validação de Nome", () => {

  test("Nome válido deve passar", () => {
    const resultado = validarNome("João");
    expect(resultado.valido).toBe(true);
  });

  test("Nome vazio deve falhar", () => {
    const resultado = validarNome("");
    expect(resultado.valido).toBe(false);
  });

});

describe("Validação de Senha", () => {

  test("Senha com 6+ caracteres deve passar", () => {
    const resultado = validarSenha("senha123");
    expect(resultado.valido).toBe(true);
  });

  test("Senha com menos de 6 caracteres deve falhar", () => {
    const resultado = validarSenha("abc");
    expect(resultado.valido).toBe(false);
  });

});

describe("Validação de Username", () => {

  test("Username válido deve passar", () => {
    const resultado = validarUsername("user_123");
    expect(resultado.valido).toBe(true);
    expect(resultado.username).toBe("user_123");
  });

  test("Username com menos de 3 caracteres deve falhar", () => {
    const resultado = validarUsername("ab");
    expect(resultado.valido).toBe(false);
  });

});
