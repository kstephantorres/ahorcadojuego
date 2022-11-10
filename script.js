function $ (selector, node = document.body){
    return node.querySelector(selector)
}
function $$ (selector, node = document.body){
    return [...node.querySelectorAll(selector)]
}

let enJuego = false
const botonAgregar=$('.boton-agregar')
const botonIniciar=$('.boton-iniciar')
const botonNuevo=$('.boton-nuevo')
const botonDesistir=$('.boton-desistir')
const botonGuardar=$('.boton-guardar')
const botonCancelar=$('.boton-cancelar')
const contenedorPalabra=$('.palabra')
const contenedorErrores=$('.contenedor-errores')
const contenedorTexto=$('.contenedor-texto')
const contenedorMuñeco=$('.muñeco')
const palabraNueva=$('.input-texto')
const mensajeAtencion=$$('.atencion')

const muñecoFondo=$('.fondo')
const muñecoMastil=$('#mastil')
const muñecoBase=$('#base')
const muñecoTecho=$('#techo')
const muñecoSoga=$('#soga')
const muñecoCabeza=$('#cabeza')
const muñecoCuerpo=$('#cuerpo')
const muñecoBrazoI=$('#brazoi')
const muñecoBrazoD=$('#brazod')
const muñecoPiernaI=$('#piernai')
const muñecoPiernaD=$('#piernad')


let palabras = ["ALURA","ORACLE", "ONE", "JAVASCRIPT", "HTML"]
let palabra=''


function iniciarJuego(){
    enJuego=true
    botonIniciar.classList.add('oculto')
    botonAgregar.classList.add('oculto')
    botonNuevo.classList.remove('oculto')
    botonDesistir.classList.remove('oculto')
    contenedorPalabra.classList.remove('oculto')

    palabra= palabras[Math.floor(Math.random()*palabras.length)]
    for(let i=0;i<palabra.length;i++){
        contenedorPalabra.innerHTML += '<div class="contenedor-letra"></div>'
    }
    contenedorErrores.classList.remove('oculto')

    muñecoMastil.classList.remove('oculto')
    muñecoBase.classList.remove('oculto')
    muñecoTecho.classList.remove('oculto')
    muñecoSoga.classList.remove('oculto')
    
}

function nuevoJuego(){
    enJuego=true
    errores=[]
    acierto=0
    usadas=[]
    for(let i=0;i<intento;i++){
        esconderMuñeco(muñeco[i])
    }
    intento=0
    contenedorPalabra.innerHTML =''
    contenedorErrores.innerHTML = '<div class="contenedor-error"></div>'

    palabra= palabras[Math.floor(Math.random()*palabras.length)]
    for(let i=0;i<palabra.length;i++){
        contenedorPalabra.innerHTML += '<div class="contenedor-letra"></div>'
    }
}

function desistir(){
    enJuego=false
    contenedorPalabra.innerHTML =''
    contenedorErrores.innerHTML = '<div class="contenedor-error"></div>'
    botonIniciar.classList.remove('oculto')
    botonAgregar.classList.remove('oculto')
    botonNuevo.classList.add('oculto')
    botonDesistir.classList.add('oculto')
    contenedorPalabra.classList.remove('oculto')
    muñecoMastil.classList.add('oculto')
    muñecoBase.classList.add('oculto')
    muñecoTecho.classList.add('oculto')
    muñecoSoga.classList.add('oculto')
    for(let i=0;i<intento;i++){
        esconderMuñeco(muñeco[i])
    }
    intento=0
} 

window.onkeydown = digitar 

let usadas =[]
let errores=[]
let intento=0
let acierto=0

// const muñeco=["cabeza","cuerpo","brazoi","brazod","piernai","piernad"]
const muñeco={
    0: muñecoCabeza,
    1: muñecoCuerpo,
    2: muñecoBrazoI,
    3: muñecoBrazoD,
    4: muñecoPiernaI,
    5: muñecoPiernaD
}

function revelarMuñeco(parte){
    parte.classList.remove('oculto')
}
function esconderMuñeco(parte){
    parte.classList.add('oculto')
}

function digitar(event){
    let tecla = event.keyCode
    if((tecla>64 && tecla<91 && enJuego===true && !usadas.includes(tecla))){
        let caracter = String.fromCharCode(tecla).toUpperCase()
        let error=false
        for(let i=0;i<palabra.length;i++)
        {
            if(palabra[i] === caracter){
                
                contenedorPalabra.children[i].textContent = palabra[i]
                
                acierto++
                if(!(errores.includes(caracter)))
                {   
                    errores.push(caracter)
                }
            }
            else{
                error=true
            }
        }

        if(error && !(errores.includes(caracter)) && intento<6)
        {
            console.log('intentos',intento)
            if(intento===0){
                contenedorErrores.innerHTML=''
            }
            errores.push(caracter)
            contenedorErrores.innerHTML += '<div class="contenedor-error">'+ caracter +'</div>'
            revelarMuñeco(muñeco[intento])
            intento++
        }
        if(intento > 5){
            
            $('#enlace-modal').click()
            $('.titulo-popup').textContent='Fin del Juego'
            acierto=0
            usadas=[]
            enJuego=false
        }
        if(acierto === palabra.length){
            $('#enlace-modal').click()
            $('.titulo-popup').textContent='Ganaste, Felicidades!'
            acierto=0
            usadas=[]
            enJuego=false
        }

        usadas.push(tecla)
    }
}

function agregarPalabra(){
    botonIniciar.classList.add('oculto')
    botonAgregar.classList.add('oculto')
    contenedorMuñeco.classList.add('oculto')
    botonGuardar.classList.remove('oculto')
    botonCancelar.classList.remove('oculto')
    contenedorTexto.classList.remove('oculto')
    muñecoFondo.classList.add('oculto')
    // mensajeAtencion.style.display="flex"
    console.log("🚀 ~ file: script.js ~ line 184 ~ agregarPalabra ~ mensajeAtencion", mensajeAtencion)
    mensajeAtencion.map(msj => {
        
        return msj.style.display="flex"
    })
    palabraNueva.focus()
}
function guardar(){
    if(palabraNueva.value!='')
    {
    // mensajeAtencion.classList.add('oculto') 
    // mensajeAtencion.style.display="none"  
    mensajeAtencion.map(msj=>msj.style.display="none")
    palabras.push(palabraNueva.value.toUpperCase())
    palabraNueva.value=''
    cancelar()
    iniciarJuego()
    }
}
function cancelar(){
    botonIniciar.classList.remove('oculto')
    botonAgregar.classList.remove('oculto')
    contenedorMuñeco.classList.remove('oculto')
    botonGuardar.classList.add('oculto')
    botonCancelar.classList.add('oculto')
    contenedorTexto.classList.add('oculto')
    muñecoFondo.classList.remove('oculto')
    // mensajeAtencion.style.display="none"
    mensajeAtencion.map(msj=>msj.style.display="none")
    palabraNueva.value=''
}



