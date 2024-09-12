const Sequelize = require('sequelize');

// Configurações da base de dados
const database = new Sequelize('VmotionDB', 'VMotion', 'vmotionvmotion123', {

    dialect: 'mssql', host: 'localhost', port: 49976, dialectOptions: { options: {
            trustServerCertificate: true 
        }
    }
});

database.sync();

module.exports = database;
