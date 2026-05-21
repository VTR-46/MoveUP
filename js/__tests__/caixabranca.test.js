const { buscar, validarEmail, validarNome, validarSenha, validarUsername } = require("../logica/validacoes.js");

describe("CAIXA BRANCA - validarNome", () => {
  // Caminho 1: nome vazio (falha)
  test("Deve retornar erro quando nome é vazio", () => {
    const resultado = validarNome("");
    expect(resultado.valido).toBe(false);
    expect(resultado.erro).toBeDefined();
  });

  // Caminho 2: nome válido (sucesso)
  test("Deve retornar sucesso quando nome é válido", () => {
    const resultado = validarNome("Maria");
    expect(resultado.valido).toBe(true);
    expect(resultado.erro).toBeUndefined();
  });
});

describe("CAIXA BRANCA - validarSenha", () => {
  // Caminho 1: senha vazia
  test("Deve retornar erro quando senha é vazia", () => {
    const resultado = validarSenha("");
    expect(resultado.valido).toBe(false);
    expect(resultado.erro).toContain("vazia");
  });

  // Caminho 2: senha com menos de 6 caracteres
  test("Deve retornar erro quando senha tem menos de 6 caracteres", () => {
    const resultado = validarSenha("123");
    expect(resultado.valido).toBe(false);
    expect(resultado.erro).toContain("6");
  });

  // Caminho 3: senha válida (6 ou mais caracteres)
  test("Deve retornar sucesso quando senha tem 6 ou mais caracteres", () => {
    const resultado = validarSenha("123456");
    expect(resultado.valido).toBe(true);
    expect(resultado.erro).toBeUndefined();
  });
});

describe("CAIXA BRANCA - validarEmail", () => {
  // Caminho 1: email vazio
  test("Deve retornar erro quando email é vazio", () => {
    const resultado = validarEmail("");
    expect(resultado.valido).toBe(false);
    expect(resultado.erro).toContain("vazio");
  });

  // Caminho 2: email sem formato válido (sem @ e ponto)
  test("Deve retornar erro quando email não tem @ e ponto", () => {
    const resultado = validarEmail("teste.com");
    expect(resultado.valido).toBe(false);
    expect(resultado.erro).toContain("válido");
  });

  // Caminho 3: email com formato válido
  test("Deve retornar sucesso quando email tem formato válido", () => {
    const resultado = validarEmail("teste@teste.com");
    expect(resultado.valido).toBe(true);
    expect(resultado.erro).toBeUndefined();
  });
});

describe("CAIXA BRANCA - validarUsername", () => {
  // Caminho 1: username vazio
  test("Deve retornar erro quando username é vazio", () => {
    const resultado = validarUsername("");
    expect(resultado.valido).toBe(false);
    expect(resultado.erro).toContain("vazio");
  });

  // Caminho 2: username com menos de 3 caracteres válidos
  test("Deve retornar erro quando username tem menos de 3 caracteres válidos", () => {
    const resultado = validarUsername("ab");
    expect(resultado.valido).toBe(false);
    expect(resultado.erro).toContain("3");
  });

  // Caminho 3: username válido (3+ caracteres válidos)
  test("Deve retornar sucesso quando username tem 3+ caracteres válidos", () => {
    const resultado = validarUsername("User_1");
    expect(resultado.valido).toBe(true);
    expect(resultado.username).toBe("user_1");
  });
});

describe("CAIXA BRANCA - buscar", () => {
  // Caminho 1: tamanho fora do intervalo válido (0 ou > 20)
  test("Deve retornar erro quando tamanho é 0 (fora do intervalo)", () => {
    const resultado = buscar(0, "abc", "a");
    expect(resultado).toContain("entre com um inteiro");
  });

  // Caminho 2: caractere não existe na cadeia
  test("Deve retornar erro quando caractere não pertence à cadeia", () => {
    const resultado = buscar(5, "abc", "d");
    expect(resultado).toContain("não pertence");
  });

  // Caminho 3: caractere existe na cadeia (valor encontrado)
  test("Deve retornar posição quando caractere existe na cadeia", () => {
    const resultado = buscar(5, "abc", "b");
    expect(resultado).toContain("aparece na posição");
    expect(resultado).toContain("2");
  });
});
