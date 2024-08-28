const vehicle = require('../models/vehicle')

module.exports = {
    async vehicle(req, res){

        const vehicles = await vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year']
        });

        res.render('../views/index', {vehicles});
    }
}