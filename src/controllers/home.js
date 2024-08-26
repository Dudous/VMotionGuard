const loc = require('../models/loc')


module.exports = {
    async pagInicialGet(req, res){

        res.render('../views/index');
    },
    
    async pagInicialPost(req, res){

        const dados = req.body;

        // Criando sala no banco de dados
        await loc.create({
        CordX: dados.cordX,
        CordY: dados.cordY
        });

        // Redirecionar para a página principal
        res.redirect('/');
    }
}