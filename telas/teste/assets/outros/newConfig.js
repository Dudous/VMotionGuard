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

var connection = new Connection(config);  

connection.on('connect', function(err) {  
    if (err) {
        console.log('Connection Error: ', err);
    } else {
        console.log("Connected");  
        executeStatement1(); // Executa a query após a conexão ser estabelecida
    }
});

connection.connect(); 

var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  

function executeStatement1() {  
    var request = new Request("SELECT * FROM cadastros;", function(err, rowCount) {  
        if (err) {  
            console.log(err);
        } else {
            console.log(rowCount + ' rows returned');
        }
    });

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log(column.value);
        });
    });

    connection.execSql(request);
}



        // request.addParameter('Name', TYPES.NVarChar,'SQL Server Express 2019');  
        // request.addParameter('Number', TYPES.NVarChar , 'SQLEXPRESS2019');  
        // request.addParameter('Cost', TYPES.Int, 11);  
        // request.addParameter('Price', TYPES.Int,11);  
        // request.on('row', function(columns) {  
        //     columns.forEach(function(column) {  
        //       if (column.value === null) {  
        //         console.log('NULL');  
        //       } else {  
        //         console.log("Product id of inserted item is " + column.value);  
        //       }  
        //     });  
        // });

        // // Close the connection after the final event emitted by the request, after the callback passes
        // request.on("requestCompleted", function (rowCount, more) {
        //     connection.close();
        // });
        // connection.execSql(request);  
