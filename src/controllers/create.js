const vehicle = require('../models/vehicles')
const user = require('../models/users');
const Log = require('../models/log')
const tel = require('../models/telefone')
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

        await Log.create({
            msg: `novo veiculo criado`
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

        await Log.create({
            msg: `Veículo com placa ${data.plate}, modelo ${data.model}, marca ${data.brand} foi cadastrado para o usuário ${req.params.user}.`
        });

        res.redirect('/userCars/'+ req.params.user);
    },   

    async user(req, res){

        const data = req.body;
        const cpf = data.CPF.replace(/[-.]/g, '');

        const cpfExiste = await user.findOne({
            where: { CPF: cpf },
            raw: true, 
            attributes: ['IDUser', 'CPF', 'Name', 'Email', 'Password', 'IsAdmin']
        });

        let validcpf = cpf
        let somaCpf = 0

        validcpf = parseInt(cpf, 10)

        console.log(validcpf)

        while(validcpf >=
             1)
        {
            somaCpf += validcpf % 10
            validcpf = parseInt(validcpf/ 10)
            console.log(validcpf)
        }

        console.log(somaCpf)


        if(somaCpf % 11)
            return res.render('../views/registerUser', {erro: "CPF Inválido"});

        if(cpfExiste)
        {
            return res.render('../views/registerUser', {erro: "O cpf já existe, por favor faça login"});
        }
        else{

            var cryptoPass = createHmac('sha256', data.userPassword).digest('hex')

            await user.create({
                CPF: data.CPF.replace(/[-.]/g, ''),
                Name: data.name,
                Telefone: data.telefone.replace(/\D/g, ''),
                Email: data.email,
                Password: cryptoPass,
                IsAdmin: 0
            });

            await Log.create({
                msg: `novo usuário criado`
            });

            const userInserted = await user.findOne({
                where: { CPF: data.CPF.replace(/[-.]/g, '') },
                raw: true, 
                attributes: ['IDUser']
            });

            await tel.create({
                Telefone: data.telefone.replace(/\D/g, ''),
                IDUser: userInserted.IDUser
            });
    
            res.redirect('/')
        }

    }
}
