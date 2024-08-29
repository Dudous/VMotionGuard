const vehicle = require('../models/vehicles')

module.exports = {
    async vehicle(req, res){

        const vehicles = await vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year']
        });

        res.render('../views/index', {vehicles});
    }
}