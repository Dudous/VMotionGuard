const coordinates = require('../models/coordinates')
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
    }
}