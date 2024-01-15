class empanada {

    constructor(sabor, cantidad) {
        this.sabor = sabor;
        this.cantidad = cantidad;
    }

    obtenerSabor() {
        return this.sabor;
    }

    obtenerCantidad() {
        return this.cantidad;
    }

    agregarCantidad(c) {
        this.cantidad = parseInt(this.cantidad, 10) + parseInt(c, 10);
    }

    sacarCantidad(c) {
        let c1 = this.cantidad;
        if (c1 - c >= 0) {
            this.cantidad - c1;
        }
    }
}

export default empanada;