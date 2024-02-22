// Daniel Castañeda

//Nivel del juego
let numeroMaximo = 100;

//Variables
let numeroSecreto;
let contador;

//Lista de númros generados
let listaNumeros = [];

//Establecer condiciones de inicio
condicionesIniciales();

// Detectar cuando se presiona la tecla Enter
window.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      // Simular un clic en el botón verificar
      document.getElementById('verificar').click();
    }
  });

//Asignar texto a un elemento de html
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

//Generar número secreto
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    //Vaciar la lista de numeros generados
    if (listaNumeros.length > Math.floor(numeroMaximo/5)) {
        listaNumeros.shift();
    }
    //Comprobar si el número está en la lista de numeros generados
    if (listaNumeros.includes(numeroGenerado)) {
        return generarNumeroSecreto();
    }
    else {
        listaNumeros.push(numeroGenerado);
        return numeroGenerado;
    }
}

//Condiciones iniciales
function condicionesIniciales() {
    //Titulo del juego
    asignarTextoElemento('h1', 'Juego del número secreto');
    //Instrucciones
    asignarTextoElemento('p', `Ingrese un número entre 1 y ${numeroMaximo}`);
    //Número secreto
    numeroSecreto = generarNumeroSecreto();
    //Contador de intentos
    contador = 0;
    return;
}

//Verificar el intento del usuario
function verificarIntento() {
    contador++;
    let numeroUsuario = parseInt(document.getElementById('intentoUsuario').value);

    //Si acerto el número
    if (numeroUsuario === numeroSecreto) {
        asignarTextoElemento('p', `¡Felicidades! Acertaste el número en ${contador} ${contador == 1 ? 'intento' : 'intentos'}.`);
        document.getElementById('verificar').setAttribute('disabled', 'true');
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    //Si el número es mayor
    else if (numeroUsuario > 0 && numeroUsuario < numeroSecreto) {
        asignarTextoElemento('p', 'El número secreto es mayor.');
        limpiarCaja();
    }
    //Si la respuesta es menor
    else if(numeroUsuario <= numeroMaximo && numeroUsuario > numeroSecreto) {
        asignarTextoElemento('p', 'El número secreto es menor.');
        limpiarCaja();
    }
    else {
        alert('El número ingresado no es valido');
        limpiarCaja();
        contador--;
    }
    return;
}

//Reiniciar Juego
function reiniciarJuego() {
    //Limpiar la caja
    limpiarCaja();
    //Restablecer las condiciones iniciales
    condicionesIniciales();
    //Desabilitar el botón de nuevo juego y abilitar el de verificar
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
    document.getElementById('verificar').removeAttribute('disabled');
    return;
}

//Limpiar la caja
function limpiarCaja() {
    document.querySelector('#intentoUsuario').value = '';
    return;
}
