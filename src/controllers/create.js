const vehicle = require('../models/vehicles')
const user = require('../models/users')

module.exports = {

    async vehicle(req, res){

        const data = req.body;

        await vehicle.create({
        Plate: data.plate,
        Brand : data.brand,
        Model: data.model,
        Year: data.year
        });

        res.redirect('/');
    },

    async user(req, res){

        const data = req.body;

        // implementar criptografia de senhas


        await user.create({
            CPF: data.cpf,
            Email: data.email,
            Password: data.password
        });

        res.redirect('/')
    }
}