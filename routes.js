// Iniciando Route do Express
const express = require('express');
const route = express.Router();

const map = require('./src/controllers/map');
const create = require('./src/controllers/create');
const del = require('./src/controllers/delete');
const read = require('./src/controllers/read');
const update = require('./src/controllers/update');

route.get('/', map.map);
route.put('/:latitude/:longitude', map.attMap);

route.post('/car', create.vehicle);
route.delete('/car/:id', del.vehicle);
route.get('/car', read.vehicle);
route.patch('/car/:id', update.vehicle);

route.get('/registerUser', read.registerUser);

route.post('/user', create.user);

module.exports = route;