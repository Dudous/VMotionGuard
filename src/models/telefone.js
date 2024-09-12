const Sequelize = require('sequelize');
const database = require('../config/db');
const users = require('../models/users')

const telefone = database.define('Telefone', {
    IDTel: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Telefone: {
        type: Sequelize.STRING(255),
        allowNull: false
    }
});

telefone.belongsTo(users, {
    constraint: true, 
    foreignKey: 'IDUser',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});


module.exports = telefone;
