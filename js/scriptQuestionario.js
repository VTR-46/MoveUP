const usuarioLS = JSON.parse(localStorage.getItem('usuarioLOCAL'));     //CONTA DO USUARIO LOCALSTORAGE

const formulario = document.querySelector('#form-questionario');

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    //alert("OBJETIVO: " + objetivoInput.value + ", LOCAL " + localInput.value + " ESTADO: " + estadoInput.value); //TESTE

    const objetivoInput = document.querySelector('input[name="objetivo"]:checked')?.value;
    const localInput = document.querySelector('input[name="local"]:checked')?.value;
    const estadoInput = document.querySelector('input[name="estado"]:checked')?.value;

    //ALTERA OS OBJETIVOS CONFORME O INPUT DO USUARIO 
    // OBEJETIVO 0 = Ganho de massa muscular, 1 = Emagrecimento, 2 = Força 3 = Resistencia 
    // LOCAL 0 = Academia, 1 = Casa
    // ESTADO 0 = Sedentario, 1 = Mais ou Menos, 2 = Ativo

    usuarioLS.objetivo = objetivoInput;
    usuarioLS.local = localInput;
    usuarioLS.estado = estadoInput;
    usuarioLS.possuiTreinoPesonalizado = true;  //MUDA PARA TRUE PARA SUMUIR COM O SPAN NA PAGINA HOME
    localStorage.setItem('usuarioLOCAL', JSON.stringify(usuarioLS));    //ATUALIZA NO LOCALSTORAGE

    //alert(objetivo + " " + local + " " + estado);

    //window.location.href = "../html/home.html";
    



});