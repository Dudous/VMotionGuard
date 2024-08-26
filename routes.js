// Iniciando Route do Express
const express = require('express');
const route = express.Router();

const home = require('./src/controllers/home');

route.get('/', home.pagInicialGet);
route.post('/', home.pagInicialPost);

module.exports = route;