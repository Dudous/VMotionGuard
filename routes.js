// Iniciando Route do Express
const express = require('express');
const route = express.Router();

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

route.get('/homePageAdmin/:id', read.home)
route.post('homePageAdmin/:id', create.home)

route.get('/userCars/:user', read.userCar); // abrir carros

route.get('/car/:user/:id', read.vehicle); // abrir carro específico
route.post('/car/:id', create.vehicle);
route.patch('/car/:id', update.vehicle);
route.post('/carDelete/:user/:id', del.vehicle);

route.get('/registerCar/:user', read.registerVehicle);
route.post('/registerCar/:user', create.registerVehicle);

route.get('/informacoesUsers/:id/:admin', read.editarUser)
route.post('/informacoesUsers/:id/:admin', update.editarUser)

route.get('/allCars/:id', read.allCars);

route.get('/minhaConta/:id', read.myAccount);
route.post('/minhaConta/:id', update.editarMinhaConta);

route.get('/recuperarSenha', read.recuperarSenha)
route.post('/recuperarSenha', login.recuperarSenha)
route.post('/codigoSenha/:id', login.validateCode)
route.post('/novaSenha', login.novaSenha)

module.exports = route;