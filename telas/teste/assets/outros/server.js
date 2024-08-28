const express = require('express');
const bodyParser = require('body-parser');
const { Connection, Request, TYPES } = require('tedious');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const config = {
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

const connection = new Connection(config);

connection.on('connect', function (err) {
    if (err) {
        console.log('Connection Error: ', err);
    } else {
        console.log("Connected");
    }
});

app.post('/api/insert', (req, res) => {
    const { user, senha } = req.body;

    const request = new Request(
        "INSERT INTO cadastros (nome) VALUES (@nameUser);",
        (err, rowCount) => {
            if (err) {
                console.log("Insert Error: ", err);
                res.status(500).send("Error inserting data");
            } else {
                console.log(rowCount + ' row(s) inserted');
                res.status(200).send("Data inserted successfully");
            }
        }
    );

    request.addParameter('nameUser', TYPES.NVarChar, user);

    connection.execSql(request);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
