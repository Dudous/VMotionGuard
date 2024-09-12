const vehicle = require('../models/vehicles')
const Log = require('../models/log')

module.exports = {
    async vehicle(req, res){

        const idUser = req.params.user

        await vehicle.destroy({
            where:{
                IDVehicle : req.params.id
            }
        });

        await Log.create({
            msg: `O veículo com ID ${req.params.id} foi excluído.`
        });

        res.redirect('/userCars/' + idUser);
    }
}