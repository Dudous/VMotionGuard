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
        type: Sequelize.CHAR(15),
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
        allowNull: false
    }
});

module.exports = users;