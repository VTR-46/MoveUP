# MoveUP 💪

Aplicação web de gerenciamento de treinos com testes automatizados.

---

## 📋 Pré-requisitos

- **Node.js** versão 14+ instalado
  - Baixe em: [nodejs.org](https://nodejs.org)
  - Verifique: `node --version` e `npm --version`

---

## 🚀 Como Rodar no Seu PC

### 1️⃣ Clone o repositório
```bash
git clone <seu-link-do-repositorio>
cd MoveUP
```

### 2️⃣ Instale as dependências
```bash
npm install
```

### 3️⃣ Pronto! Agora você pode...

#### 🧪 Rodar os testes (uma única vez)
```bash
npm test
```

#### 👀 Rodar os testes em modo observação (recomendado para desenvolvimento)
```bash
npm test -- --watch
```

#### 📊 Ver cobertura de testes
```bash
npm test -- --coverage
```

---

## 📂 Estrutura do Projeto

```
MoveUP/
├── js/
│   ├── logica/          ← Funções puras (testáveis)
│   │   ├── validacoes.js
│   │   ├── usuarios.js
│   │   ├── streak.js
│   │   └── treinos.js
│   ├── ui/              ← Interface (manipula DOM)
│   │   ├── login.js
│   │   ├── cadastro.js
│   │   ├── perfil.js
│   │   └── homepage.js
│   ├── exercicios.js    ← Constantes
│   ├── treino.js        ← Constantes
│   └── __tests__/       ← Testes Jest
│       ├── validacoes.test.js
│       ├── usuarios.test.js
│       ├── streak.test.js
│       └── treinos.test.js
├── html/                ← Arquivos HTML
├── css/                 ← Estilos CSS
├── img/                 ← Imagens
├── package.json         ← Dependências do projeto
├── .gitignore           ← Arquivos a ignorar no Git
└── README.md            ← Este arquivo
```

---

## ✅ O que é Testado?

- ✅ Validação de emails
- ✅ Força de senhas
- ✅ Login e cadastro
- ✅ Cálculo de streaks
- ✅ Busca de caracteres em cadeias
- ✅ Lógica de treinos

**Total: 44 testes**

---

## 🎯 Atalhos Úteis no Modo Watch

Quando rodando `npm test -- --watch`, você pode:

- **a** = rodar todos os testes
- **f** = rodar só os que falharam
- **p** = filtrar por nome de arquivo
- **t** = filtrar por nome do teste
- **q** = sair

---

## 🔧 Troubleshooting

#### ❌ "npm não é reconhecido"
- Instale Node.js de novo: [nodejs.org](https://nodejs.org)
- Reinicie o terminal

#### ❌ "Testes falhando"
- Rode `npm install` novamente
- Delete a pasta `node_modules` e instale de novo

#### ❌ "Módulos não encontrados"
- Rode: `npm install`

---

## 📝 Arquivos Importantes

- `package.json` - Configurações e dependências
- `ESTRUTURA.md` - Explicação detalhada da arquitetura
- `INSTRUCOES_HTML.md` - Como carregar scripts nos HTMLs
- `.gitignore` - Arquivos a ignorar no Git

---

## ✨ Comece Por Aqui

1. Rode os testes: `npm test`
2. Explore o código em `js/logica/`
3. Leia `ESTRUTURA.md` para entender a separação UI vs Lógica
4. Faça mudanças e veja os testes passando em tempo real!
