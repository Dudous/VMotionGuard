const sequelize = require('sequelize');

//configurações da base de dados
const database = new sequelize('VMotionDB', 'VMotion', 'vmotionvmotion123',
{
    dialect: 'mssql', host:'localhost', port: 1434
});

database.sync();

module.exports = database;