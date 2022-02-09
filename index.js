/*/////////
VARIABLES 
////////*/

//DISPLAY
const displayValorAnterior = document.getElementById ("valor-anterior")
const displayValorActual = document.getElementById ("valor-actual")

//BOTONES NUMEROS
const botonesNumeros = document.querySelectorAll ('.numero')
//uso el queryselectorALL para tomar todos los botones

//BOTONES OPERADORES 
const botonesOperadores = document.querySelectorAll ('.operador')



/*//////
CLASES
/////*/

//declaramos la clase Calculadora y sus metodos (+,-,div, mult)
class Calculadora {

    //metodos ↓↓↓
    sumar (num1, num2) {
        return num1 + num2
        //metodo sumar (parametro1, parametro2)
        //returna suma entre parametro1 + parametro2
    }

    restar (num1, num2) {
        return num1 - num2
    }

    dividir (num1, num2) {
        return num1 / num2
    }

    multiplicar (num1, num2) {
        return num1 * num2
    }
}

//declaramos la clase DISPLAY y su constructor
class Display {

    //creo un objeto con sus diferentes propiedades
    constructor (displayValorAnterior, displayValorActual) {
        //propiedades del display = 

        this.displayValorActual = displayValorActual
        this.displayValorAnterior = displayValorAnterior

        //propiedad calculadora
        this.calculadora = new Calculadora ()

        this.tipoOperacion = undefined //las operaciones (botones) se van a ir guardando aqui.

        //valor actual (numero que estoy guardando)
        this.valorActual = '' //usamos strings, y no numeros
        
        //valor anterior (numero que estoy guardando)
        this.valorAnterior = ''

        //creamos los signos para agregar al display
        this.signos = {
            sumar:"+",
            dividir: "%",
            multiplicar: "x",
            restar: "-"
        }

    }

    //metodo 1)
    agregarNumero (numero) {

        //para que no me repita el punto escribo una condicion: 
        if (numero === '.' && this.valorActual.includes ('.')) return //si el numero es = "." y ademas ya hay un "." incluido, 
        //no haga nada con ese boton.
        
        //si eso no se cumple, me va agregando mas numeros despues del punto
        this.valorActual = this.valorActual.toString() + numero.toString() //al valor actual le sumamos el numero elegido
        //se usa .toString porque vamos a estar usando strings y numeros.

        this.imprimirValores() //agrego la funcion para imprimir los valores.
    }

    //metodo 2)
    //metodo para imprimir los numeros segun bootn que toque.
    imprimirValores () {
        this.displayValorActual.textContent = this.valorActual //el contenido del display le imprimo el valor actual 
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}` 
        //al valor anterior le digo que es igual a el valor anterior + el signo de operacion elegida
        //si no tiene ninguno de estos signos, que no ponga nada al final ("")
    }

    //metodo 3)
    borrar () {
        this.valorActual = this.valorActual.toString().slice (0,-1) //corta el ultimo numero
        this.imprimirValores () //y actualizo los valores en display
        //recuerda: agregar onclick al boton en html
    }

    //metodo 4) 
    borrarTodo () {
        this.valorActual = '' //se borra el valor actual
        this.valorAnterior = '' // se borra el valor anterior
        this.tipoOperacion = undefined // se borra cualquier operacion de boton
        this.imprimirValores () // y lo imprimo
        //recuerda: agregar onclick en boton 
    }

    //metodo 5)
    calcular () {
        
        //traemos los valores de valor actual y anterior y los guardamos en variables
        const valorAnterior = parseFloat (this.valorAnterior)
        const valorActual = parseFloat (this.valorActual)
        //ambos guardados como numeros con el parsefloat

        //si quiere hacer un parseFloate de una variable vacia (``) entonces me tira un NAN
        //si cualquiera de estas variables son NAN entonces que no haga nada.
        if (isNaN(valorActual)|| isNaN(valorAnterior)) return
 
        //si cualqueir de las variables tiene un valor numerico entonces hacemos lo siguiente:
        //usamos un metodo de la calculadora, y a traves del operador elegido calculamos el valor actual entre (parametros)
        this.valorActual = this.calculadora [this.tipoOperacion] (valorAnterior, valorActual)
    }

    //metodo 6)
    computar (tipo) {
        this.tipoOperacion !== "igual" && this.calcular() //si el tipo de operador que elegimos es "=" solo entonces hacemos la operacion calcular
        
        this.tipoOperacion = tipo //el tipo de operacion se actualiza al que acabamos de recibir (tipo)
        this.valorAnterior = this.valorActual || this.valorAnterior //si hacemos el calculo y el valor anterior cambia, entonces 
        //se muestra el valor actual, sino queda el valor anterior (es decir, si seguimos calculando el valor anterior siempre queda, 
        //si elegimos = entonces el valor anterior cambia x el actual)
        this.valorActual = "" //cuando terminamos la operacion el valor actual queda vacio.
        this.imprimirValores () //siempre imprimimos para que muestre el calculo final.
    }

}

//creo la constante display que como valor tiene el objeto creado.
const display = new Display (displayValorAnterior, displayValorActual)

//TODOS LOS BOTONES DE NUMEROS HACEN ESTO AL HACER CLICK
botonesNumeros.forEach (boton =>{
    boton.addEventListener ('click', ()=>{
        display.agregarNumero (boton.innerHTML) //por cada click, agrego ese valor a display.
        //usamos el innerhtml porque tomamos el numero escrito en el html para poder guardarlo en js.
    })
})

//TODOS LOS BOTONES DE OPERADORES HACEN ESTO AL HACER CLICK
botonesOperadores.forEach (boton => {
    boton.addEventListener ('click', ()=>{
        display.computar (boton.value) //por cada boton de operador que apretemos mandamos una funcion "computar" al display con un valor
        //usamos el valor y no el innerHTML porque lo que necesitamos no es el (%, + , - o el X) sino el VALUE de ese <div>
    })
})
