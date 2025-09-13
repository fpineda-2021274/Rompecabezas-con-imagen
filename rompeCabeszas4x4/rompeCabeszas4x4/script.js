let puzzleContainer = document.getElementById('puzzle');
let mensaje = document.getElementById('mensaje');
let countdownElement = document.getElementById('countdown');
let modal = document.getElementById('modal');
let modalTitle = document.getElementById('modal-title');

let piezas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let estado = [];
let timer;
const totalTime = 120; 
let timeLeft = totalTime;


const imagenes = [
    'image/fila-1-columna-1.jpg', 
    'image/fila-1-columna-2.jpg', 
    'image/fila-1-columna-3.jpg', 
    'image/fila-1-columna-4.jpg', 
    'image/fila-2-columna-1.jpg', 
    'image/fila-2-columna-2.jpg', 
    'image/fila-2-columna-3.jpg', 
    'image/fila-2-columna-4.jpg', 
    'image/fila-3-columna-1.jpg', 
    'image/fila-3-columna-2.jpg', 
    'image/fila-3-columna-3.jpg', 
    'image/fila-3-columna-4.jpg', 
    'image/fila-4-columna-1.jpg', 
    'image/fila-4-columna-2.jpg', 
    'image/fila-4-columna-3.jpg',
];

function mezclar(array) {
    let copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    while (!esSolvable(copia)) {
        copia = [...array];
        for (let i = copia.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [copia[i], copia[j]] = [copia[j], copia[i]];
        }
    }
    return copia;
}


function esSolvable(array) {
    let inversions = 0;
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] !== 15 && array[j] !== 15 && array[i] > array[j]) {
                inversions++;
            }
        }
    }
    const emptyRow = Math.floor(array.indexOf(15) / 4);
    return (inversions + emptyRow) % 2 === 0;
}


function dibujar() {
    puzzleContainer.innerHTML = '';
    estado.forEach((valor, i) => {
        let celda = document.createElement('div');
        celda.classList.add('celda');
        if (valor === 15) {

            celda.classList.add('vacio');
            celda.style.backgroundImage = `url(${imagenes[valor]})`; 
        } else {
   
            celda.style.backgroundImage = `url(${imagenes[valor]})`;
            celda.addEventListener('click', () => mover(i));
        }
        puzzleContainer.appendChild(celda);
    });
}


function mover(indice) {
    let vacio = estado.indexOf(15);
    let filas = 4;
    let col = indice % filas;
    let fila = Math.floor(indice / filas);
    let colVacio = vacio % filas;
    let filaVacio = Math.floor(vacio / filas);

   
    if ((Math.abs(col - colVacio) === 1 && fila === filaVacio) || 
        (Math.abs(fila - filaVacio) === 1 && col === colVacio)) {
        [estado[indice], estado[vacio]] = [estado[vacio], estado[indice]];
        dibujar();
        verificar();
    }
}


function verificar() {
    if (JSON.stringify(estado) === JSON.stringify(piezas)) {
        clearInterval(timer);
        mensaje.innerHTML = '¡Felicidades! Completaste el rompecabezas.';
        mostrarModal('¡Ganaste!');
    }
}


function iniciarTemporizador() {
    timeLeft = totalTime;
    countdownElement.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        countdownElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            mostrarModal('¡Perdiste! Se acabó el tiempo.');
        }
    }, 1000);
}


function mostrarModal(texto) {
    modalTitle.innerText = texto;
    modal.style.display = 'flex';
}

function ocultarModal() {
    modal.style.display = 'none';
}


function reiniciar() {
    clearInterval(timer);
    estado = mezclar(piezas);
    mensaje.innerHTML = '';
    ocultarModal();
    dibujar();
    iniciarTemporizador();
}

reiniciar();