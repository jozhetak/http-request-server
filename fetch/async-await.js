const fetch = require('node-fetch');

// Manejo de errores
function handleError(err) {
    console.log(`Solicitud fallida: ${err}`)
}

// Consumir API con fetch (en NPM disponible como fetch-node)
async function getLuke(URL) {
    try {
        const res = await fetch(URL)
        const luke = await res.json()
        const resHomeworld = await fetch(luke.homeworld)
        luke.homeworld = await resHomeworld.json()
        // Si todo correcto...
        console.log(`${luke.name} nació en ${luke.homeworld.name}`)
    } catch (err) {
        // Si ocurrio un error...
        handleError(err)
    }
    
}

getLuke('https://swapi.co/api/people/1/')

// Instrucciones para ejecutar este código:
// 1. npm install
// 2. ./node_modules/.bin/babel-node XMLHttpRequest/async-await.js