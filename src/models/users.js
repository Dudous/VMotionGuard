const Sequelize = require('sequelize');
const database = require('../config/db');

const users = database.define('User', {
    IDUser: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    CPF: {
        type: Sequelize.CHAR(11),
        allowNull: false
    },
    Name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    IsAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = users;