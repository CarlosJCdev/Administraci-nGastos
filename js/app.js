//Creamos las variables
const presupuestoUsuario = prompt('Ingresa cantidad del presupuesto:')

let cantidadPresupuesto;
const formulario = document.getElementById('agregar-gasto');
console.log(presupuestoUsuario);

//Clases

//Clase de presupuesto
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    // Método para restar los gatos al presupuesto
    presupuestoRestante(cantidad = 0) {
        return this.restante -= Number(cantidad);
    }
}
//Clase para ingresar los valores al html
class Interfaz {
    insertarPresupuesto(cantidad) {
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }
    imprimirMensjae(mensaje, tipo) {
        const divmensaje = document.createElement('div');
        divmensaje.classList.add('text-center', 'alert');
        if (tipo === 'error') {
            divmensaje.classList.add('alert-danger');
        } else {
            divmensaje.classList.add('alert-success');
        }
        divmensaje.appendChild(document.createTextNode(mensaje));

        //Insertamos en el form la alerta
        document.querySelector('.primario').insertBefore(divmensaje, formulario);
        //Defino un timer para quitar el elemento
        setTimeout(function () {
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 2000);
    }
    //Insertamos los gastos en la lista
    agregarGatoListado(nombre, cantidad) {
        const gastoListado = document.querySelector('#gastos ul');

        //Creamos el Li
        const Li = document.createElement('Li');
        Li.className = 'list-group-item d-flex justify-content-between align-items-center';
        //Insertamos el elemento
        Li.innerHTML = `${nombre} $ 
        <span class="badge badge-primary badge-pill"> ${cantidad} </span>`;
        //Agregamos al HTML
        gastoListado.appendChild(Li);
    }

    //Comprobamos el presupuesto restante al agregar algun gasto
    presupuestoRestante(cantidad) {
        const restante = document.querySelector('span#restante');
        //Actualizamos el presupuesto que nos queda
        const presupuestoRestanteUsuario =
            cantidadPresupuesto.presupuestoRestante(cantidad);
        restante.innerHTML = `${presupuestoRestanteUsuario}`;
        //Despues de que realiza la resta la presupuesto, llamamos a la function
        this.comprobarPresupuesto();
    }

    //Cambiamos el color del presupuesto, cuando la cantidad llegue a ciertas cantidades
    comprobarPresupuesto() {
        const presupuestototal = cantidadPresupuesto.presupuesto;
        const presupuestorestante = cantidadPresupuesto.restante;

        //Comprobamos que el presupuesto este en el 25%
        if((presupuestototal / 4 ) > presupuestorestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        } else if ((presupuestototal / 2) > presupuestorestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }
}

//Events listeners
document.addEventListener('DOMContentLoaded', function () {
    if (presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();
    } else {
        //Instanciamos el presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        //Instanciamos la clase Interface
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});
formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    //Accedemos y leemos a los campos de la cantidad y gasto
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    //Instanciamos la clase interface nuevamente para imprimir un mensaje si se ingresan datos correctos o incorrectos
    const ui = new Interfaz();

    // comprobamos que no esten vacios los cammpos
    if (nombreGasto === '' || cantidadGasto === '') {
        //EL primer parametro es el texto que se imprimirá y el segungo 'error' es la clase para identificarlo
        ui.imprimirMensjae('Error en los datos', 'error');
    } else {
        //INsertamos los datos ingresados en el form
        //Usando el método ya creado
        ui.imprimirMensjae('Datos agregados');
        ui.agregarGatoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
});