// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');

const users = require('./users');
const coordinates = require('./coordinates');

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

vehicles.belongsTo(users, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'IDUser',
    onDelete: 'CASCADE'
});

vehicles.belongsTo(coordinates, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'IDLoc'
});

// Exportando essa tabela
module.exports = vehicles;