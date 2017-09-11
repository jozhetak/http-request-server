const express = require('express')
const app = express()
const port = 3000

// Página de inicio
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Servidor escuchando...
app.listen(3000, () => {
    console.log(`Servidor escuchando en el puerto ${port}...`)
})