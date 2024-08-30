// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');

// Criando a tabela Sala
const vehicles = database.define('Vehicle', {
    IDVehicle: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Plate: {
        type: Sequelize.CHAR(8),
        allowNull: false
    },
    Brand: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Model: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Year: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

// Exportando essa tabela
module.exports = vehicles;