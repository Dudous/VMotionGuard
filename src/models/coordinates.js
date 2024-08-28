// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');

// Criando a tabela Sala
const coordinates = database.define('Coordinates', {
    IDLoc: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Latitude: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Longitude: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Exportando essa tabela
module.exports = coordinates;