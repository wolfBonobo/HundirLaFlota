import Jugador from "./Jugador";

let jugador = new Jugador();

jugador.iniciarMapa();
jugador.imprimirMapa();


/* // Crear nodo de tipo Element
var parrafo = document.createElement("p");
	
// Crear nodo de tipo Text
var contenido = document.createTextNode("Hola Mundo!");
	
// Añadir el nodo Text como hijo del nodo tipo Element
parrafo.appendChild(contenido);
	
// Añadir el nodo Element como hijo de la pagina
document.body.appendChild(parrafo); */



//Funcion coloca barcos en el tablero aleatoriamente
crearBarcosAleatorio = function () {
    let inicioH = 0,
        inicioV = 0,
        finH = 0,
        finV = 0;
    // definimos las posiciones de los barcos [barcos,posiciones]
    let barcos = [
        [1, 4], //Portaviones que ocupa 4 cuadrados
        [2, 3], //Acorazados de tres cuadros
        [3, 2], //Cruceros de 2 cuadros
        [4, 1] //Destructores de un solo cuadro
    ];
    for (let i = 0; i < barcos.length; i++) {
        for (let j = 0; j < barcos[i][0]; j++) {
            inicioH = Math.floor(Math.random() * 10); // 0 a 9
            inicioV = Math.floor(Math.random() * 10);
            //console.log(`INICIO HORIZONTAL ${inicioH} INICIO VERTICAL ${inicioV}`)

            if (barcos[i][1] == 1) {
                // un barco de una sola casilla
                if (setBarco(inicioH, inicioV, inicioH, inicioV) == false) {
                    //Reintento colocar barco
                    j--;
                }
            } else {
                let direccion = Math.floor(Math.random() * 2);
                if (direccion == 0) {
                    // derecha fin Horizontal será punto inicioH + huecos que ocupa el barco-1 
                    finH = inicioH + barcos[i][1] - 1;
                    finV = inicioV;
                } else if (direccion == 1) {
                    // abajo 
                    finH = inicioH;
                    finV = inicioV + barcos[i][1] - 1;
                }
                if (setBarco(inicioH, inicioV, finH, finV) == false) {
                    j--;
                }
            }
        }
    }

    console.log(mapaEnemigo);
}

setBarco = function (inicioH, inicioV, finH, finV) {
    // Revisamos si existe un barco en esa posicion o en sus alrededores
    if (existeBarco(inicioH, inicioV, finH, finV) == false) {
        // guardamos el barco en array de 
        for (let i = inicioH; i <= finH; i++) {
            for (let j = inicioV; j <= finV; j++) {

                document.getElementById(`e-${i}-${j}`).className = "table-success posicion";
                document.getElementById(`e-${i}-${j}`).innerHTML = "O";
                mapaEnemigo[i][j] = 1;

            }
        }
        return true;
    }
    return false;
};

/**
 * Funcion que determina si hay un barco en el punto que indicamos o
 * en sus alrededores
 *	@param integer inicioH 
 *	@param integer inicioV
 *	@param integer finH
 *	@param integer finV
 *	@return boolean true si existe un barco en esa posicion
 */

existeBarco = function (inicioH, inicioV, finH, finV) {
    //Fuera del tablero 
    if (finH > 9 || finV > 9)
        return true;

    inicioH = inicioH > 0 ? inicioH - 1 : inicioH;
    inicioV = inicioV > 0 ? inicioV - 1 : inicioV;
    finH = finH < 9 ? finH + 1 : finH;
    finV = finV < 9 ? finV + 1 : finV;
    for (let i = inicioH; i <= finH; i++) {
        for (let j = inicioV; j <= finV; j++) {
            if (mapaEnemigo[i][j] == 1) {
                return true;
            }
        }
    }
    return false;
}





