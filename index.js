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

//clase controla la calculadora
class Display {

    constructor (displayValorAnterior, displayValorActual) {
        //propiedades del display = 

        this.displayValorActual = displayValorActual
        this.displayValorAnterior = displayValorAnterior

        //propiedad calculadora
        this.calculadora = new Calculadora ()

        //valor actual (numero que estoy gurdando)
        this.valorActual = '' //usamos strings, y no numeros
        
        //valor anterior (numero que estoy guardando)
        this.valorAnterior = ''

    }

    agregarNumero (numero) {

        //para que no me repita el punto escribo una condicion: 
        if (numero === '.' && this.valorActual.includes ('.')) return
        
        this.valorActual = this.valorActual + numero
        this.imprimirValores()
    }

    //metodo para imprimir los numeros segun bootn que toque.
    imprimirValores () {
        this.displayValorActual.textContent = this.valorActual
        this.displayValorAnterior.textContent = this.valorAnterior
    }
}

const display = new Display (displayValorAnterior, displayValorActual)

botonesNumeros.forEach (boton =>{
    boton.addEventListener ('click', ()=>{
        display.agregarNumero (boton.innerHTML)
    })
})
