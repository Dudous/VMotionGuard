// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');

const users = require('./users');

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
    },
    Latitude: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Longitude: {
        type: Sequelize.STRING,
        allowNull: true
    },
    KMs: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    Gas: {
        type: Sequelize.DECIMAL,
        allowNull: true
    },
    Oil: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    Temperature: {
        type: Sequelize.DECIMAL,
        allowNull: true
    },
    Battery: {
        type: Sequelize.STRING,
        allowNull: true
    },
    water: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

vehicles.belongsTo(users, {
    constraint: true, //Garantir integridade referencial
    foreignKey: 'IDUser',
    onDelete: 'CASCADE'
});


// Exportando essa tabela
module.exports = vehicles;