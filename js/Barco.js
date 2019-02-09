//==================//
//  CLASE BARCO   //
//==================//
/* 1 Portaviones que ocupa 4 cuadrados.
2 Acorazados de tres cuadros
3 Cruceros de 2 cuadros
4 Destructores de un solo cuadro

*Map()
set( key, value ): añadir una nueva pareja clave-valor
get( key ): obtener el valor asociado a una clave
delete( key ): borrar una pareja clave-valor por medio de la clave.
has( key ): comprobar si hay una determinada clave en el mapa.
 */

class Barco {

    constructor(tipo) {
        this.tipo = tipo;
        this.direccion=0;
        this.posiciones=new Map();
        this.tocado=false;
        this.hundido=false;

    }
}
