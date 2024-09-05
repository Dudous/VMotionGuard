const vehicle = require('../models/vehicles')
const user = require('../models/users')

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

        }


        res.redirect('/homePageAdmin/' + admin);
    },

    async editarMinhaConta(req, res){

        const data = req.body;
        const id = req.params.id;


            await user.update({
                Name: data.userName,
                Email: data.userEmail, 
                Password: data.userPassword
            },
            {
                where: { IDUser: id }
            });

            const currentUser = await user.findOne({
                raw: true,
                attributes: ['IDUser', 'Name', 'CPF', 'Email', 'Password', 'IsAdmin'],
                where: {IDUser : id}
            })

            if(currentUser.IsAdmin == 1)
                {
                    res.redirect('/homePageAdmin/' + currentUser.IDUser);
                }
                else{

                    res.redirect('/homePageUser/' + currentUser.IDUser);
                }

         }
}