const usuarioLS = JSON.parse(localStorage.getItem('usuarioLOCAL'));

const boasVindasUsuario = document.querySelector('#boas-vindas');

const nome = document.createTextNode(usuarioLS.nome);


const d = new Date();
console.log(d.getHours());


const bomEstado = document.createElement("p");

if (d.getHours() >= 4 && d.getHours() < 12) {
    console.log("Bom dia");
    bomEstado.innerHTML = "Bom Dia";
}

if (d.getHours() >= 12 && d.getHours() < 18) {
    console.log("Boa Tarde");
    bomEstado.innerHTML = " Boa Tarde";
}

if ((d.getHours() >= 19 && d.getHours() <= 23) || (d.getHours() >= 0 && d.getHours < 4)) {
    bomEstado.innerHTML = " Boa Noite";
}



boasVindasUsuario.textContent += " " + bomEstado.innerHTML + " " + nome.textContent;