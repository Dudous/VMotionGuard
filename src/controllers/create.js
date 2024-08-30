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
            attributes: ['IDUser', 'CPF', 'Email', 'Password', 'IsAdmin']
        });

        console.log(userExiste)
        
        if (userExiste) {

            console.log(userExiste.CPF)
            console.log(data.userInput)

            console.log(typeof(userExiste.CPF))
            console.log(typeof(data.userInput))
        
            if (userExiste.CPF == data.userInput && userExiste.Password == data.senhaInput){
               
                    return res.redirect('/homePage'); 
                
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

        const parametro = data.CPF;

        const userExiste = await user.findOne({
            where: { CPF: parametro },
            raw: true, 
            attributes: ['IDUser', 'CPF', 'Email', 'Password', 'IsAdmin']
        })

        if (userExiste) {
            //nicolle@email
            const notFound = '';
            const incorrect = '';
            const msg = 'User existe por favor faça login'
            res.render('../views/index', {msg, notFound, incorrect})}
        else{

            await user.create({
                CPF: data.CPF,
                Email: data.email,
                Password: data.password
            });
        }

        res.redirect('/')
    }
}