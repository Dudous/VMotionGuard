const vehicle = require('../models/vehicles')

module.exports = {
    async vehicle(req, res){

        const idUser = req.params.user


        console.log('post car' + idUser)
        console.log('post car' + req.params.id)

        await vehicle.destroy({
            where:{
                IDVehicle : req.params.id
            }
        });

        res.redirect('/userCars/' + idUser);
    }

}