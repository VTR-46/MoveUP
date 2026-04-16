const { validarLogin, validarCadastro, criarNovoUsuario } = require("../logica/usuarios.js");

describe("Validação de Login", () => {

  test("Login com credenciais váidas deve passar", () => {
    const users = [
      { email: "test@example.com", senha: "password123", nome: "Teste" }
    ];
    const resultado = validarLogin("test@example.com", "password123", users);
    expect(resultado.valido).toBe(true);
    expect(resultado.usuario.nome).toBe("Teste");
  });

  test("Login com email inválido deve falhar", () => {
    const users = [
      { email: "test@example.com", senha: "password123", nome: "Teste" }
    ];
    const resultado = validarLogin("wrong@example.com", "password123", users);
    expect(resultado.valido).toBe(false);
    expect(resultado.erro).toBe("Credenciais incorretas.");
  });

  test("Login com senha inválida deve falhar", () => {
    const users = [
      { email: "test@example.com", senha: "password123", nome: "Teste" }
    ];
    const resultado = validarLogin("test@example.com", "wrongpass", users);
    expect(resultado.valido).toBe(false);
  });

  test("Login com campos vazios deve falhar", () => {
    const users = [];
    const resultado = validarLogin("", "", users);
    expect(resultado.valido).toBe(false);
    expect(resultado.erro).toBe("Por favor, preencha e-mail e senha.");
  });

});

describe("Validação de Cadastro", () => {

  test("Cadastro com dados válidos deve passar", () => {
    const users = [];
    const resultado = validarCadastro("João", "Silva", "joao@example.com", "senha123", users);
    expect(resultado.valido).toBe(true);
    expect(resultado.usuario.nome).toBe("João");
  });

  test("Cadastro sem nome deve falhar", () => {
    const users = [];
    const resultado = validarCadastro("", "Silva", "joao@example.com", "senha123", users);
    expect(resultado.valido).toBe(false);
    expect(resultado.erro).toBe("Preencha seu nome e sobrenome.");
  });

  test("Cadastro com email inválido deve falhar", () => {
    const users = [];
    const resultado = validarCadastro("João", "Silva", "joao.invalid", "senha123", users);
    expect(resultado.valido).toBe(false);
    expect(resultado.erro).toBe("Insira um e-mail válido.");
  });

  test("Cadastro com senha fraca deve falhar", () => {
    const users = [];
    const resultado = validarCadastro("João", "Silva", "joao@example.com", "123", users);
    expect(resultado.valido).toBe(false);
    expect(resultado.erro).toBe("A senha deve ter pelo menos 6 caracteres.");
  });

  test("Cadastro com email duplicado deve falhar", () => {
    const users = [
      { email: "joao@example.com", nome: "João Antigo" }
    ];
    const resultado = validarCadastro("João", "Silva", "joao@example.com", "senha123", users);
    expect(resultado.valido).toBe(false);
    expect(resultado.erro).toBe("E-mail já cadastrado.");
  });

});

describe("Criar Novo Usuário", () => {

  test("Criar novo usuário deve retornar objeto com dados corretos", () => {
    const usuario = criarNovoUsuario("Maria", "Santos", "maria@example.com", "senha456");
    expect(usuario.nome).toBe("Maria");
    expect(usuario.email).toBe("maria@example.com");
    expect(usuario.criado_em).toBeDefined();
  });

});
