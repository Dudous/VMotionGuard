const vehicle = require('../models/vehicles')
const user = require('../models/users')
const Log = require('../models/log')
const tel = require('../models/telefone')

module.exports = {
    async vehicle(req, res){

        const data = req.body;

        await vehicle.update({
            Plate: data.plate,
            Brand: data.brand,
            Model: data.model,
            Year: data.year
        },
        {
            where: { IDVehicle: req.params.id }
        });

        await Log.create({
            msg: `Veículo ID ${req.params.vehicleId} foi atualizado. Nova placa: ${data.plate}, modelo: ${data.model}, marca: ${data.brand}, ano: ${data.year}.`
        });

        res.redirect('/');
    },

    async editarUser(req, res){

        const data = req.body;
        const admin = req.params.admin;
        const allow = data.userAllow;

        if(allow == "Usuário")
        {
            await user.update({
                IsAdmin: 0
            },
            {
                where: { IDUser: req.params.id }
            });
        }
        else{

            await user.update({
                IsAdmin: 1
            },
            {
                where: { IDUser: req.params.id }
            });

            await Log.create({
                msg: `O status de administrador do usuário ID ${req.params.id} foi atualizado para Admin.`
            });

        }


        res.redirect('/homePageAdmin/' + admin);
    },

    async editarMinhaConta(req, res){

        const data = req.body;
        const id = req.params.id;


            await user.update({
                Name: data.userName,
                Email: data.userEmail, 
                Telefone: data.userTelefone.replace(/\D/g, ''),
                Password: data.userPassword
            },
            {
                where: { IDUser: id }
            });

            await Log.create({
                msg: `As informações do usuário ID ${id} foram atualizadas. Nome: ${data.userName}, Email: ${data.userEmail}, Telefone: ${data.userTelefone.replace(/\D/g, '')}.`
            });

            await tel.update(
                {Telefone: data.userTelefone.replace(/\D/g, '')},
                {
                    where: { IDUser: id }
                });

          
            const currentUser = await user.findOne({
                raw: true,
                attributes: ['IDUser', 'Name', 'CPF', 'Email', 'Password', 'IsAdmin'],
                where: {IDUser : id}
            })

            console.log(id)

            if(currentUser.IsAdmin == 1)
                {
                    res.redirect('/homePageAdmin/' + currentUser.IDUser);
                }
                else{

                    res.redirect('/homePageUser/' + currentUser.IDUser);
                }

         }
}