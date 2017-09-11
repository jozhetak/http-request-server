const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

// const promise = new Promise(function (resolve, reject){
//     setTimeout(resolve, 1000)
// })
// 
// promise
//     .then(function() {
// 
//     })
//     .catch(function(err) {
// 
//     })

// Consumir API con XMLHttpRequest
function get(URL) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.onreadystatechange = function () {
            const DONE = 4  // Todo esta listo
            const OK = 200  // Todo esta bien
            if (this.readyState === DONE) {
                if (this.status === OK) {
                    resolve(JSON.parse(this.responseText))
                } else {
                    reject(new Error(`Se produjo un error al realizar el request: ${this.status}`))
                }
            }
        }

        xhr.open('GET', URL)
        xhr.send(null)
    })
}

// Manejo de errores
function handleError(err) {
    console.log(`Solicitud fallida: ${err}`)
}

let luke
// Personaje a consultar
get('https://swapi.co/api/people/1/')
    .then(response => {

        // Al obtener los datos del API por medio de response se asignan
        // a la variable (let) luke, de tal forma se mantienen los datos
        luke = response

        return get(luke.homeworld)
    })
    .then(homeworld => {
        // Al obtener el nombre del planeta de Luke, se le asigna al objeto Luke
        // así se reemplaza la URL 'https://swapi.co/api/planets/1/' por Tatooine
        luke.homeworld = homeworld

        // Las promesas evitan el "callback hell", son más sencillas
        console.log(`${luke.name} nació en ${luke.homeworld.name}`)
    })
    .catch(err => handleError(err))
