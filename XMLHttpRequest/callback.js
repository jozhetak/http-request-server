const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

// Consumir API con XMLHttpRequest
function get(URL, callback) {

    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        const DONE = 4  // Todo esta listo
        const OK = 200  // Todo esta bien
        if (this.readyState === DONE) {
            if (this.status === OK) {
                callback(null, JSON.parse(this.responseText))
            } else {
                callback(new Error(`Se produjo un error al realizar el request: ${this.status}`))
            }
        }
    }

    xhr.open('GET', URL)
    xhr.send(null)
}

// Manejo de errores
function handleError(err) {
    console.log(`Solicitud fallida ${err}`)
}

// Personaje a consultar
get('https://swapi.co/api/people/1/', function onResponse(err, luke){
    if(err) return handleError(err) // Si existe un error...

    // Planeta de nacimiento
    get(luke.homeworld, function onHomeworldResponse(err, homeworld){
        if(err) return handleError(err) // Si existe un error...

        // Al obtener el nombre del planeta de Luke, se le asigna al objeto Luke
        // así se reemplaza la URL 'https://swapi.co/api/planets/1/' por Tatooine
        luke.homeworld = homeworld

        console.log(`${luke.name} nació en ${luke.homeworld.name}`)
    })
})
