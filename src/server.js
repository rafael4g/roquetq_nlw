const express = require('express')
const server = express()
const route = require('./routes')
const path = require('path')

server.set('view engine', 'ejs')

server.use(express.static("public"))

server.set('views', path.join(__dirname, 'views'))

server.use(express.urlencoded({extended: true}))

server.use(route)

server.listen(3000, () => console.log("Rodando"))