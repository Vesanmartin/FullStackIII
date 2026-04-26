
// PATRÓN: Circuit Breaker

// TRES ESTADOS:
//   CERRADO : Todo normal, las llamadas pasan
//   ABIERTO : Demasiados fallos, bloqueamos X segundos
//   RECUPERACION : Probamos con UNA llamada si ya se recuperó




class CircuitBreaker {

    constructor(opciones = {}) {
        // Fallos consecutivos antes de abrir el circuito
        this.limite = opciones.limite || 3;

        // Milisegundos en esperar antes de probar de nuevo
        this.tiempoEspera = opciones.tiempoEspera || 10000;

        // Nombre para identificarlo en los logs
        this.nombre = opciones.nombre || 'CircuitBreaker';

        // Estado inicial
        this.estado = 'CERRADO';
        this.fallos = 0;
        this.ultimoFallo = null;
    }


    // Método principal
    // Recibe una función async y la ejecuta protegida
    // Ejemplo de uso:
    //   await breaker.ejecutar(() => axios.get('http://kpi-service'))
    async ejecutar(fn) {

        // Verificamos si está ABIERTO el circuito
        if (this.estado === 'ABIERTO') {
            const tiempoPasado = Date.now() - this.ultimoFallo;

            if (tiempoPasado >= this.tiempoEspera) {
                // Ya pasó el tiempo, damos una oportunidad
                this.estado = 'RECUPERACION';
                console.log(`[${this.nombre}] : RECUPERACION, probando...`);
            } else {
                // Aún no, bloqueamos la llamada
                const segundos = Math.ceil((this.tiempoEspera - tiempoPasado) / 1000);
                throw new Error(
                    `[${this.nombre}] Circuito ABIERTO. Reintenta en ${segundos}s`
                );
            }
        }

        // si esta cerrado o RECUPERACION: intentamos la llamada
        try {
            const resultado = await fn();
            this._exito();
            return resultado;

        } catch (err) {
            this._fallo(err);
            throw err;
        }
    }


    // Llamada exitosa
    _exito() {
        this.fallos = 0;

        if (this.estado === 'RECUPERACION') {
            this.estado = 'CERRADO';
            console.log(`[${this.nombre}] Recuperado: Cerrado`);
        }
    }


    // Llamada fallida
    _fallo(err) {
        this.fallos++;
        this.ultimoFallo = Date.now();

        console.warn(`[${this.nombre}] Fallo #${this.fallos}: ${err.message}`);

        if (this.fallos >= this.limite || this.estado === 'RECUPERACION') {
            this.estado = 'ABIERTO';
            console.error(
                `[${this.nombre}] ABIERTO tras ${this.fallos} fallos. ` +
                `Esperando ${this.tiempoEspera / 1000}s`
            );
        }
    }


    // Estado actual
    obtenerEstado() {
        return {
            nombre: this.nombre,
            estado: this.estado,
            fallos: this.fallos,
            ultimoFallo: this.ultimoFallo
                ? new Date(this.ultimoFallo).toISOString()
                : null
        };
    }
}

module.exports = CircuitBreaker;

