class Jugador {

    constructor(player) {
        this.mapa = [];
        this.player = player;
        this.iniciarMapa();
        this.barcos = [
            [1, new Barco(4)], //Portaviones que ocupa 4 cuadrados
            [2, new Barco(3)], //Acorazados de tres cuadros
            [3, new Barco(2)], //Cruceros de 2 cuadros
            [4, new Barco(1)] //Destructores de un solo cuadro
        ];
    }

    iniciarMapa() {
        //Inicializa mapa jugador
        for (let i = 0; i <= 9; i++) {
            this.mapa[i] = [];
            for (let j = 0; j <= 9; j++) {
                this.mapa[i][j] = 0;
            }
        }
    }

    imprimirMapa() {
        console.log(this.mapa);
    }

    crearBarcosAleatorio() {
        let inicioH = 0,
            inicioV = 0,
            finH = 0,
            finV = 0;
        for (let i = 0; i < this.barcos.length; i++) {
            for (let j = 0; j < this.barcos[i][0]; j++) {
                inicioH = Math.floor(Math.random() * 10); // 0 a 9
                inicioV = Math.floor(Math.random() * 10);
                // un barco de una sola casilla
                if (this.barcos[i][1].tipo == 1) {
                    if (this.setBarco(inicioH, inicioV, inicioH, inicioV, this.barcos[i][1]) == false) {
                        //Reintento colocar barco
                        j--;
                    }
                } else {
                    let direccion = Math.floor(Math.random() * 2);
                    if (direccion == 0) {
                        // derecha fin Horizontal será punto inicioH + huecos que ocupa el barco-1 
                        finH = inicioH + this.barcos[i][1].tipo - 1;
                        finV = inicioV;
                        this.barcos[i][1].direccion = 0;
                    } else if (direccion == 1) {
                        // abajo 
                        finH = inicioH;
                        finV = inicioV + this.barcos[i][1].tipo - 1;
                        this.barcos[i][1].direccion = 1;
                    }
                    if (this.setBarco(inicioH, inicioV, finH, finV, this.barcos[i][1]) == false) {
                        j--;
                    }
                }
            }
        }
    }

    setBarco(inicioH, inicioV, finH, finV, barco) {
        // Revisamos si existe un barco en esa posicion o en sus alrededores
        if (this.existeBarco(inicioH, inicioV, finH, finV) == false) {
            // guardamos el barco en array de 
            for (let i = inicioH; i <= finH; i++) {
                for (let j = inicioV; j <= finV; j++) {

                    if (this.player === 'j') {
                        document.getElementById(`j-${i}-${j}`).className = "table-success posicion";
                        document.getElementById(`j-${i}-${j}`).innerHTML = "O";
                        this.mapa[i][j] = 1;
                        barco.posiciones.set(`j-${i}-${j}`, 1);
                    } else {
                        this.mapa[i][j] = 1;
                        barco.posiciones.set(`e-${i}-${j}`, 1);
                    }

                }
            }
            return true;
        }
        return false;
    }

    existeBarco(inicioH, inicioV, finH, finV) {
        //Fuera del tablero 
        if (finH > 9 || finV > 9)
            return true;

        inicioH = inicioH > 0 ? inicioH - 1 : inicioH;
        inicioV = inicioV > 0 ? inicioV - 1 : inicioV;
        finH = finH < 9 ? finH + 1 : finH;
        finV = finV < 9 ? finV + 1 : finV;
        for (let i = inicioH; i <= finH; i++) {
            for (let j = inicioV; j <= finV; j++) {
                if (this.mapa[i][j] == 1) {
                    return true;
                }
            }
        }
        return false;
    }
}