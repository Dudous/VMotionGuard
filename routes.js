// Iniciando Route do Express
const express = require('express');
const route = express.Router();

const map = require('./src/controllers/map');
const create = require('./src/controllers/create');
const del = require('./src/controllers/delete');
const read = require('./src/controllers/read');
const update = require('./src/controllers/update');

route.get('/', map.map);
route.post('/:latitude/:longitude', map.attMap);

route.post('/', create.vehicle);
route.delete('/:id', del.vehicle);
route.get('/', read.vehicle);
route.put('/:id', update.vehicle);

module.exports = route;