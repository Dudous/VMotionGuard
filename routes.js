// Iniciando Route do Express
const express = require('express');
const route = express.Router();

const map = require('./src/controllers/map');
const create = require('./src/controllers/create');
const del = require('./src/controllers/delete');
const read = require('./src/controllers/read');
const update = require('./src/controllers/update');

// route.put('/:latitude/:longitude', map.attMap);

route.get('/', create.login)
route.post('/', read.login)

route.post('/car:id', create.vehicle);
route.delete('/car/:id', del.vehicle);
route.get('/car:id', read.vehicle);
route.patch('/car/:id', update.vehicle);

route.get('/registerUser', read.registerUser);
route.post('/user', create.user);

route.get('/registerCar', read.registerVehicle);
route.post('/registerCar', create.registerVehicle);

route.get('/adminCars', read.adminCars)

route.get('/homePageUser', read.home)
route.get('/homePageAdmin', read.home)

route.get('userCars/:id', read.userCar);

module.exports = route;