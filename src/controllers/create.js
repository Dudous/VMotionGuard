const vehicle = require('../models/vehicles')
const user = require('../models/users');

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
        
            if (login.CPF == cpf && login.Password == data.senhaInput){
                console.log(typeof(login.IsAdmin))

                if(login.IsAdmin == 1)
                {
                    console.log("oi")
                    res.redirect('/homePageAdmin/' + login.IDUser);
                }
                else{

                    console.log("tcahua")
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

        const data = req.body
        const mode = data.mode

        res.redirect('/');
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
        Year: data.year,
        IDUser: req.params.user
        });

        res.redirect('/userCars/'+ req.params.user);
    },   

    async user(req, res){

        const data = req.body;

        // implementar criptografia de senhas

        await user.create({
            CPF: data.CPF.replace(/[-.]/g, ''),
            Name: data.name,
            Email: data.email,
            Password: data.userPassword,
            IsAdmin: 0
        });

        res.redirect('/')
    }
}