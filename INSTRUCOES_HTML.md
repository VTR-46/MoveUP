# 📌 Como Atualizar os HTMLs

Cada HTML precisa carregar os scripts na ordem correta para que a lógica funcione.

## 🔗 Ordem de Carregamento

**SEMPRE:** Lógica → depois UI

```html
<!-- ❌ ERRADO -->
<script src="./js/ui/login.js"></script>
<script src="./js/logica/usuarios.js"></script>

<!-- ✅ CORRETO -->
<script src="./js/logica/usuarios.js"></script>
<script src="./js/ui/login.js"></script>
```

---

## 📄 Para Cada HTML

### `html/login.html`
```html
<!-- Antes do </body> -->
<script src="./js/logica/usuarios.js"></script>
<script src="./js/ui/login.js"></script>
```

### `html/cadastro.html`
```html
<!-- Antes do </body> -->
<script src="./js/logica/validacoes.js"></script>
<script src="./js/logica/usuarios.js"></script>
<script src="./js/ui/cadastro.js"></script>
```

### `html/perfil.html`
```html
<!-- Antes do </body> -->
<script src="./js/logica/streak.js"></script>
<script src="./js/ui/perfil.js"></script>
```

### `html/homepage.html`
```html
<!-- Antes do </body> -->
<script src="./js/logica/treinos.js"></script>
<script src="./js/ui/homepage.js"></script>
```

### `html/exercicios.html` e `html/treino.html`
```html
<!-- Mantém igual, pois usam arquivos originais -->
<script src="./js/exercicios.js"></script>
<script src="./js/treino.js"></script>
```

---

## 🧪 Para Testar

1. Abrir um HTML no navegador
2. Verificar console (F12) por erros
3. Funcionalidades devem funcionar normalmente
4. Rodar `npm test` para validar testes

✅ **Pronto!**
