// Iniciando Route do Express
const express = require('express');
const route = express.Router();

const map = require('./src/controllers/map');
const create = require('./src/controllers/create');
const del = require('./src/controllers/delete');
const read = require('./src/controllers/read');
const update = require('./src/controllers/update');

// route.put('/:latitude/:longitude', map.attMap);

route.get('/', read.login)
route.post('/', create.login)

route.get('/homePageUser/:id', read.home)

route.get('/userCars/:user', read.userCar);

route.get('/car/:user/:id', read.vehicle);
route.post('/carDelete/:user/:id', del.vehicle);

route.post('/car:id', create.vehicle);
route.patch('/car/:id', update.vehicle);

route.get('/registerUser', read.registerUser);
route.post('/user', create.user);

route.get('/registerCar/:user', read.registerVehicle);
route.post('/registerCar/:user', create.registerVehicle);


route.get('/homePageAdmin/:id', read.home)
route.post('homePageAdmin/:id', create.home)

route.get('/informacoesUsers/:id/:admin', read.editarUser)
route.post('/informacoesUsers/:id/:admin', update.editarUser)

route.get('/allCars/:id', read.allCars);
route.post('/registerCar', create.registerVehicle);
module.exports = route;