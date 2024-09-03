const vehicle = require('../models/vehicles')
const user = require('../models/users');

module.exports = {

    async login(req, res) {

        const data = req.body;
        const id = req.body.IDUser;

        const cpf = data.userInput.replace(/[-.]/g, '');

        const users = await user.findAll({
            raw: true,
            attributes: ['IDUser', 'CPF', 'Email', 'Password', 'IsAdmin']})

        const vehicles = await vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year', 'IDUser', 'IDLoc']})
    
        const login = await user.findOne({
            where: { CPF: cpf },
            raw: true, 
            attributes: ['IDUser', 'CPF', 'Name', 'Email', 'Password', 'IsAdmin']
        });
        
        if (login) {
        
            if (login.CPF == cpf && login.Password == data.senhaInput){

                if(login.IsAdmin == 1)
                    res.redirect('../views/homePageAdmin/' + login.IDUser);
                else
                    res.render('../views/homePageUser', {user : login});
                
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

    async registerVehicle(req, res){

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
            CPF: data.CPF.replace(/[-.]/g, ''),
            Name: data.name,
            Email: data.email,
            Password: data.password,
            IsAdmin: 0
        });

        res.redirect('/')
    }
}