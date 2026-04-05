const usuarioLS = JSON.parse(localStorage.getItem('usuarioLOCAL'));

const boasVindasUsuario = document.querySelector('#boas-vindas');

const nome = document.createTextNode(usuarioLS.nome);

//=== SISTEMA DE BOAS VINDAS DE ACORDO COM O HORARIO E NOME DO USUARIO ===

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

//==========================================

//CARD DE CRIAÇÃO DE TREINO PERSONALIZADO QUE APARECE CASO O USUARIO AINDA NÃO TENHA UM TREINO PERSONALIZADO SETADO COMO TRUE 

const divTreinoPersonalizado = document.querySelector('#div-treino-personalizado');

// usuarioLS.possuiTreinoPesonalizado = false;
// usuarioLS.possuiTreinoPesonalizado = true;

if (usuarioLS.possuiTreinoPesonalizado == false) {
    divTreinoPersonalizado.style.display = 'flex';  //APARECE
}else{
    divTreinoPersonalizado.style.display = 'none';  //SOME
}

//=================================================