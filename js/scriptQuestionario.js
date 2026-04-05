const usuarioLS = JSON.parse(localStorage.getItem('usuarioLOCAL'));

const formulario = document.querySelector('#form-questionario');

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    //alert("OBJETIVO: " + objetivoInput.value + ", LOCAL " + localInput.value + " ESTADO: " + estadoInput.value);

    const objetivoInput = document.querySelector('input[name="objetivo"]:checked')?.value;
    const localInput = document.querySelector('input[name="local"]:checked')?.value;
    const estadoInput = document.querySelector('input[name="estado"]:checked')?.value;


    usuarioLS.objetivo = objetivoInput;
    usuarioLS.local = localInput;
    usuarioLS.estado = estadoInput;
    usuarioLS.possuiTreinoPesonalizado = true;
    localStorage.setItem('usuarioLOCAL', JSON.stringify(usuarioLS));

    //alert(objetivo + " " + local + " " + estado);

    //window.location.href = "../html/home.html";
    



});