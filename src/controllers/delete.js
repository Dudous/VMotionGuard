const vehicle = require('../models/vehicles')

module.exports = {
    async vehicle(req, res){

        const idUser = req.params.user

        await vehicle.destroy({
            where:{
                IDVehicle : req.params.id
            }
        });

        res.redirect('/userCars/'+ idUser);
    }

}