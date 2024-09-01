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
    
    async login(req, res) {
        const data = req.body;
        const parametro = data.userInput;
    
        const userExiste = await user.findOne({
            where: { CPF: parametro },
            raw: true, 
            attributes: ['IDUser', 'CPF', 'Name', 'Email', 'Password', 'IsAdmin']
        });

        console.log(userExiste)
        
        if (userExiste) {

            console.log(userExiste.CPF)
            console.log(data.userInput)

            console.log(typeof(userExiste.CPF))
            console.log(typeof(data.userInput))
        
            if (userExiste.CPF == data.userInput && userExiste.Password == data.senhaInput){
                console.log('chegou')
               
                    return res.redirect('/'); 
                
            } else {
                const notFound = '';
                const msg = ''
                const incorrect = "Senha ou usuário incorretos";
                return res.render('../views/index', {incorrect, msg, notFound});
            }
        } else {
            const msg = ''
            const incorrect = ''
            const notFound = "Usuário não existe, por favor crie sua conta";
            return res.render('../views/index', { notFound, msg, incorrect}); 
        }
    },
    

    async user(req, res){

        const data = req.body;

        // implementar criptografia de senhas

        await user.create({
            CPF: data.CPF,
            Name: data.name,
            Email: data.email,
            Password: data.password,
            IsAdmin: 0
        });

        res.redirect('/')
    }
}