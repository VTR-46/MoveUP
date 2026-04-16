# 📋 Estrutura de Separação - Lógica vs UI (DOM)

## 🎯 Objetivo
Separar completamente a **lógica de negócio** (testável via Jest) da **manipulação de DOM** (code UI).

---

## 📂 Nova Estrutura

```
js/
├── logica/                    ← LÓGICA PURA (sem DOM, testável)
│   ├── validacoes.js          ← Validações, força de senha, buscar caractere
│   ├── usuarios.js            ← Login e cadastro
│   ├── streak.js              ← Cálculo de streaks e rankings
│   └── treinos.js             ← Lógica de treinos
│
├── ui/                        ← INTERFACE (manipulação de DOM)
│   ├── login.js               ← UI login (usa logica/usuarios.js)
│   ├── cadastro.js            ← UI cadastro (usa logica/usuarios.js + validacoes.js)
│   ├── perfil.js              ← UI perfil (usa logica/streak.js)
│   └── homepage.js            ← UI homepage (usa logica/treinos.js)
│
├── __tests__/                 ← TESTES JEST
│   ├── validacoes.test.js
│   ├── usuarios.test.js
│   ├── streak.test.js
│   └── treinos.test.js
│
├── exercicios.js              ← Mantém igual (só constantes)
├── treino.js                  ← Mantém igual (só constantes)
│
└── package.json               ← Configuração npm/Jest
```

---

## 🔄 Como Usar na Prática

### Setup Inicial
```bash
npm install
```

### Rodar Testes
```bash
npm test              # Rodar testes uma vez
npm run test:watch   # Ficar observando mudanças
npm run test:coverage # Gerar cobertura
```

---

## 📝 Exemplos de Uso

### Na UI (HTML)
```html
<!-- index.html ou login.html -->
<!-- 1. Carrega as funções de lógica ANTES da UI -->
<script src="./js/logica/usuarios.js"></script>
<script src="./js/logica/validacoes.js"></script>

<!-- 2. Carrega a UI que usa essas funções -->
<script src="./js/ui/login.js"></script>
```

### No Código UI (`ui/login.js`)
```javascript
function handleLogin() {
  const email = document.getElementById('inp-email').value;
  const senha = document.getElementById('inp-senha').value;
  
  const users = JSON.parse(localStorage.getItem('moveup_users') || '[]');
  
  // Chama função PURA de lógica
  const resultado = validarLogin(email, senha, users);
  
  if (!resultado.valido) {
    alert(resultado.erro);
  } else {
    localStorage.setItem('moveup_user', JSON.stringify(resultado.usuario));
  }
}
```

### Nos Testes (`__tests__/usuarios.test.js`)
```javascript
const { validarLogin } = require("../logica/usuarios.js");

test("Login com credenciais válidas deve passar", () => {
  const users = [
    { email: "test@example.com", senha: "password123" }
  ];
  const resultado = validarLogin("test@example.com", "password123", users);
  expect(resultado.valido).toBe(true);
});
```

---

## ✅ Benefícios

| Aspecto | Antes | Depois |
|--------|-------|--------|
| **Testabilidade** | ❌ Impossível testar (DOM) | ✅ Fácil com Jest |
| **Reutilização** | ❌ Código misturado | ✅ Funções puras |
| **Manutenção** | ❌ Difícil de debugar | ✅ Isolado e claro |
| **Escalabilidade** | ❌ Código cresce sem controle | ✅ Organizado em módulos |

---

## 📚 Arquivos de Lógica Pura

### `logica/validacoes.js`
- `buscar(tamanho, cadeia, caractere)` - Buscar caractere
- `validarEmail(email)` - Validar email
- `calcularForcaSenha(senha)` - Força da senha
- `validarNome(nome)` - Validar nome
- `validarSenha(senha)` - Validar senha
- `validarUsername(username)` - Validar username

### `logica/usuarios.js`
- `validarLogin(email, senha, users)` - Vale login
- `validarCadastro(nome, sobrenome, email, senha, users)` - Validar cadastro
- `criarNovoUsuario(nome, sobrenome, email, senha)` - Criar novo usuário

### `logica/streak.js`
- `calcularStreak(historico, streakData)` - Calcular sequência
- `calcularRanking(meuStreak, todosUsuarios, meuEmail)` - Calcular ranking
- `obterEstatisticas(historico, workouts)` - Estatísticas

### `logica/treinos.js`
- `obterTopTreinos(treinos, quantidade)` - Top N treinos
- `criarTreinoDeModelo(modelo)` - Criar treino de modelo
- `validarTreino(treino)` - Validar treino
- `filtrarPorGrupoMuscular(treinos, grupo)` - Filtrar por grupo

---

## 🎓 Próximos Passos

1. ✅ Estrutura criada
2. ⏭️ Atualizar HTMLs para carregar scripts na ordem correta
3. ⏭️ Testar no navegador
4. ⏭️ Executar `npm test` para rodar testes Jest

---

## 💡 Dica
Se precisar adicionar nova função testável, crie em `logica/` e use em `ui/`. Nunca misture DOM com lógica!
