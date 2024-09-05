// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');

// Criando a tabela Sala
const carInfo = database.define('CarInfo', {
    IDInfo: {
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
    },
    KMs: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Gas: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    Oil: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    Temperature: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    Battery: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Exportando essa tabela
module.exports = carInfo;