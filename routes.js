// Iniciando Route do Express
const express = require('express');
const route = express.Router();

const map = require('./src/controllers/map');
const create = require('./src/controllers/create');
const del = require('./src/controllers/delete');
const read = require('./src/controllers/read');
const update = require('./src/controllers/update');
const login = require('./src/controllers/login');

// route.put('/:latitude/:longitude', map.attMap);

route.get('/', read.login)
route.post('/', create.login)

route.get('/registerUser', read.registerUser);
route.post('/registerUser', create.user);

route.get('/homePageUser/:id', read.home)

route.get('/userCars/:user', read.userCar); // abrir carros
route.get('/car/:user/:id', read.vehicle); // abrir carro específico
route.post('/carDelete/:user/:id', del.vehicle);

route.get('/forgotPass/:mail', login.forgotPassword)

route.post('/car/:id', create.vehicle);
route.patch('/car/:id', update.vehicle);

route.get('/registerCar/:user', read.registerVehicle);
route.post('/registerCar/:user', create.registerVehicle);

route.get('/homePageAdmin/:id', read.home)
route.post('homePageAdmin/:id', create.home)

route.get('/informacoesUsers/:id/:admin', read.editarUser)
route.post('/informacoesUsers/:id/:admin', update.editarUser)

route.get('/allCars/:id', read.allCars);

route.get('/contaAdmin/:id', read.informacoesContaAdmin);
route.post('/informacoesUsers/:id/:admin', update.editarUser)

module.exports = route;