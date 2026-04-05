


const nomeInput = document.querySelector('#nomeInput');
const emailInput = document.querySelector('#emailInput');
const senhaInput = document.querySelector('#senhaInput');

const nomeError = document.querySelector('#nome-error');

nomeInput.addEventListener('input', () => {
    nomeError.textContent = '';
    nomeInput.setCustomValidity('');

    if (nomeInput.validity.valueMissing) {
        const errorMsg = 'Digite um nome';
        nomeError.textContent = errorMsg;
    }

});

const emailError = document.querySelector('#email-error');

emailInput.addEventListener('input', () => {
    emailError.textContent = '';
    emailInput.setCustomValidity('');

    if (emailInput.validity.typeMismatch) {
        const errorMsg = 'Insira um formato valido de e-mail';
        emailInput.setCustomValidity(errorMsg);
        emailError.textContent = errorMsg;
    }

    if (emailInput.validity.valueMissing) {
        const errorMsg = 'O campo de e-mail não pode estar vazio';
        emailInput.setCustomValidity(errorMsg);
        emailError.textContent = errorMsg;


    }

});

const senhaError = document.querySelector('#senha-error');

senhaInput.addEventListener('input', () => {
    senhaError.textContent = '';
    confirmarSenhaInput.setCustomValidity('');

    if (senhaInput.validity.valueMissing) {
        const errorMsg = 'O campo de senha não pode estar vazio';
        senhaInput.setCustomValidity(errorMsg);
        senhaError.textContent = errorMsg;
    }



});

const confirmarSenhaInput = document.querySelector('#confirma-senhaInput');
const senhacError = document.querySelector('#senhac-error');

confirmarSenhaInput.addEventListener('input', () => {
    senhacError.textContent = '';
    confirmarSenhaInput.setCustomValidity('');

    if (confirmarSenhaInput.value !== senhaInput.value) {
        const errorMsg = 'As senhas não coincidem';
        confirmarSenhaInput.setCustomValidity(errorMsg);
        senhacError.textContent = errorMsg;
    }

});

const form = document.querySelector('#form-cadastro');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let valido = true;

    // EMAIL
    if (!emailInput.value || emailInput.validity.typeMismatch) {
        emailError.textContent = 'E-mail inválido';
        valido = false;
    }

    // SENHA
    if (senhaInput.value.length < 8) {
        senhaError.textContent = 'Senha deve ter no mínimo 8 caracteres';
        valido = false;
    }

    // CONFIRMAR SENHA
    if (senhaInput.value !== confirmarSenhaInput.value) {
        senhaError.textContent = 'As senhas não coincidem';
        valido = false;
    }

    if (valido) {
        alert('Cadastro realizado');
        const usuario = {
            nome: nomeInput.value,
            email: emailInput.value,
            senha: senhaInput.value,
        }

        console.log(usuario);

        localStorage.setItem('usuarioLOCAL', JSON.stringify(usuario));


    }
});