const vehicle = require('../models/vehicles')
const user = require('../models/users');
const { createHmac } = require('node:crypto');

module.exports = {

    async login(req, res) {

        const data = req.body;

        const cpf = data.userInput.replace(/[-.]/g, '');

        const login = await user.findOne({
            where: { CPF: cpf },
            raw: true, 
            attributes: ['IDUser', 'CPF', 'Name', 'Email', 'Password', 'IsAdmin']
        });
        
        if (login) {

            var cryptoPass = createHmac('sha256', data.senhaInput).digest('hex')
        
            if (login.CPF == cpf && login.Password == cryptoPass){

                if(login.IsAdmin == 1)
                {
                    res.redirect('/homePageAdmin/' + login.IDUser);
                }
                else{

                    res.redirect('/homePageUser/' + login.IDUser);
                }
                
            } else {
                const notFound = '';
                const incorrect = "Senha ou usuário incorretos";
                return res.render('../views/index', {incorrect, notFound});
            }
        } else {
            const incorrect = ''
            const notFound = "Usuário não existe, por favor crie sua conta";
            return res.render('../views/index', { notFound, incorrect}); 
        }
    },

    async home(req, res){

        res.redirect('/');
    },


    async vehicle(req, res){
        const data = req.body;

        await vehicle.create({
        Plate: data.plate,
        Brand : data.brand,
        Model: data.model,
        Year: data.year,
        IDInfo: 1
        });

        res.redirect('/');
    },

    async registerVehicle(req, res){

        const data = req.body;

        await vehicle.create({
        Plate: data.plate,
        Brand : data.brand,
        Model: data.model,
        Year: data.year,
        IDUser: req.params.user
        });

        res.redirect('/userCars/'+ req.params.user);
    },   

    async user(req, res){

        const data = req.body;
        console.log(data)
        const cpf = data.CPF.replace(/[-.]/g, '');
        console.log(typeof(data.userPassword));

        const cpfExiste = await user.findOne({
            where: { CPF: cpf },
            raw: true, 
            attributes: ['IDUser', 'CPF', 'Name', 'Email', 'Password', 'IsAdmin']
        });

        if(cpfExiste)
        {
            const cpfExiste = "O cpf já existe, por favor faça login"
            return res.render('../views/registerUser', {cpfExiste});
        }
        else{

            var cryptoPass = createHmac('sha256', data.userPassword).digest('hex')

            await user.create({
                CPF: data.CPF.replace(/[-.]/g, ''),
                Name: data.name,
                Telefone: data.telefone,
                Email: data.email,
                Password: cryptoPass,
                IsAdmin: 0
            });
    
            res.redirect('/')
        }

    }
}