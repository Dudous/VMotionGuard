// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');

// Criando a tabela Sala
const loc = database.define('Loc', {
    IDLoc: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    CordX: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    CordY: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

// Exportando essa tabela
module.exports = loc;