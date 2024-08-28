const vehicle = require('../models/vehicle')

module.exports = {
    async vehicle(req, res){

        await vehicle.destroy({
            where:{
                IDVehicle : req.params.id
            }
        });

        res.redirect('/')
    }
}