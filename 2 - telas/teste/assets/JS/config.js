// const express = require('express');
// const bodyParser = require('body-parser');
// const { Connection, Request, TYPES } = require('tedious');

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());

// const config = {
//     server: 'CA-C-0064P\\SQLEXPRESS.vmotion.windows.net',
//     authentication: {
//         type: 'default',
//         options: {
//             userName: 'nicolle',
//             password: '235711131719'
//         }
//     },
//     options: {
//         encrypt: true,
//         trustServerCertificate: true,
//         database: 'vmotion'
//     }
// };

// const connection = new Connection(config);

// connection.on('connect', function (err) {
//     if (err) {
//         console.log('Connection Error: ', err);
//     } else {
//         console.log("Connected");
//     }
// });

// app.post('/api/insert', (req, res) => {
//     const { user, senha } = req.body;

//     const request = new Request(
//         "INSERT INTO cadastros (nome) VALUES (@nameUser);",
//         (err, rowCount) => {
//             if (err) {
//                 console.log("Insert Error: ", err);
//                 res.status(500).send("Error inserting data");
//             } else {
//                 console.log(rowCount + ' row(s) inserted');
//                 res.status(200).send("Data inserted successfully");
//             }
//         }
//     );

//     request.addParameter('nameUser', TYPES.NVarChar, user);
//     request.addParameter('senha', TYPES.NVarChar, senha);

//     connection.execSql(request);
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var Connection = require('tedious').Connection;  
var config = {  
    server: 'CA-C-0064P\\SQLEXPRESS.vmotion.windows.net',  
    authentication: {
        type: 'default',
        options: {
            userName: 'nicolle', 
            password: '235711131719'  
        }
    },
    options: {
        encrypt: true,
        trustServerCertificate: true,
        database: 'vmotion' 
    }
};  

var connection = new Connection(config);  //conection é da biblioteca tedious e usa as configuração do config 

// se o e vento de conexão ocorrer ('conect' é um return no tedious)
connection.on('connect', function(err) {  //após a  conexão mostra erros que podem ter ocorrido va coxão
    if (err) {
        console.log('Connection Error: ', err);
    } else {
        console.log("Connected");  
        // Aqui, execute a função de inserção ou selecione conforme necessário
        executeInsertStatement("User", "Senha");
    }
});

connection.connect();

var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;

function executeInsertStatement(nameUser, senha) {  
    var request = new Request(
        "INSERT INTO cadastros (nome) VALUES (@nameUser);", 
        function(err, rowCount) {  
            if (err) {  
                console.log("Insert Error: ", err);
            } else {
                console.log(rowCount + ' row(s) inserted');
            }
        }
    );

    //Adiciona os parâmetros para evitar SQL Injection
    request.addParameter('nameUser', TYPES.NVarChar, nameUser);
    request.addParameter('senha', TYPES.NVarChar, senha);

    connection.execSql(request);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// var Connection = require('tedious').Connection;  
// var config = {  
//     server: 'CA-C-0064P\\SQLEXPRESS.vmotion.windows.net',  
//     authentication: {
//         type: 'default',
//         options: {
//             userName: 'nicolle', 
//             password: '235711131719'  
//         }
//     },
//     options: {
//         encrypt: true,
//         trustServerCertificate: true,
//         database: 'vmotion' 
//     }
// };  

// //interpoplar strings

// var connection = new Connection(config);  

// connection.on('connect', function(err) {  
//     if (err) {
//         console.log('Connection Error: ', err);
//     } else {
//         console.log("Connected");  
//         executeStatement1(); // Executa a query após a conexão ser estabelecida
//     }
// });

// connection.connect(); //etapa 1

// var Request = require('tedious').Request;  //etapa 2 select
// var TYPES = require('tedious').TYPES;  

// function executeStatement1() {  
//     var request = new Request("SELECT * FROM cadastros;", function(err, rowCount) {  
//         if (err) {  
//             console.log(err);
//         } else {
//             console.log(rowCount + ' rows returned');
//         }
//     });

//     request.on('row', function(columns) {
//         columns.forEach(function(column) {
//             console.log(column.value);
//         });
//     });

//     connection.execSql(request); // etapa 3 inserção

//     let nameUser = document.getElementById("user").value;
//     let senha = document.getElementById("senha").value;
    
//     var Request = require('tedious').Request;  
//     var TYPES = require('tedious').TYPES;  
    
//     function executeStatement2() {  
//         var request = new Request(`INSERT INTO cadastros(nome) values(${nameUser});`, function(err, rowCount) {  
//             if (err) {  
//                 console.log(err);
//             } else {
//                 console.log(rowCount + ' rows returned');
//             }
//         });
    
//         request.on('row', function(columns) {
//             columns.forEach(function(column) {
//                 console.log(column.value);
//             });
//         });
    
//         connection.execSql(request);// para fazer insert ou update pou delte
// }}