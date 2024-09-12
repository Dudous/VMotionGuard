const Sequelize = require('sequelize');
const database = require('../config/db');

const Log = database.define('Log', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    msg: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    dt_evento: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('SYSDATETIME()')
    }
}, {
    tableName: 'log', 
    timestamps: false
});

module.exports = Log;
