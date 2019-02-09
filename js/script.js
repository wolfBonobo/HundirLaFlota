let jugador = new Jugador('j');
let enemigo = new Jugador('e');

const prepararPartida = () => {
    //Añado EventListener para disparar al mapa enemigo
    let posiciones = document.getElementsByClassName("disparo");
    for (let i = 0; i < posiciones.length; i++) {
        const element = posiciones[i];
        element.addEventListener('click', disparo, true);
    }

    enemigo.crearBarcosAleatorio();
    jugador.crearBarcosAleatorio();
    enemigo.imprimirMapa();

}


//DISPAROS
/* 
 0=AGUA->TRAS DISPARO PASA A 2
 1=BARCO->TRAS DISPARO PASA A 2
 2=YA DISPARADO
  */
function disparo() {
    let idCelda = this.id
    console.log('disparado a ' + idCelda);
    let disparoMapa = this.id.split('-');
    let x = disparoMapa[1];
    let y = disparoMapa[2];
    //let idCelda=`e-${x}-${y}`;

    //TOCADO o HUNDIDO
    if (enemigo.mapa[x][y] == 1) {

        document.getElementById(idCelda).className = "table-secondary";
        document.getElementById(idCelda).innerHTML = "O";
        enemigo.mapa[x][y] = 2;

    } else if (enemigo.mapa[disparoMapa[1]][disparoMapa[2]] == 0) {

        document.getElementById(idCelda).className = "table-danger";
        document.getElementById(idCelda).innerHTML = "x";
        enemigo.mapa[x][y] = 2;
    }
    //Elimino EventListener en Celda para no poder repetir disparo.
    document.getElementById(idCelda).removeEventListener("click", disparo, true);

    setTimeout(disparoEnemigo, 500);
}


function disparoEnemigo() {
    let disparoCertero = false;
    while (!disparoCertero) {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        let idCelda = `j-${x}-${y}`;

        if (jugador.mapa[x][y] !== 2) {
            //TOCADO O HUNDIDO
            if (jugador.mapa[x][y] === 1) {
                jugador.mapa[x][y] = 2;
                document.getElementById(idCelda).className = "table-secondary";
                document.getElementById(idCelda).innerHTML = "O";
                //FALLO
            } else {
                document.getElementById(idCelda).className = "table-danger";
                document.getElementById(idCelda).innerHTML = "x";
                jugador.mapa[x][y] = 2;

            }
            disparoCertero = true;
        }


    }
}
prepararPartida();