const vehicle = require('../models/vehicles')

module.exports = {
    
    async registerUser(req, res){
        res.render('../views/registerUser');
    },
    
    async vehicle(req, res){

        const vehicles = await vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year']
        });

        res.render('../views/index', {vehicles});
    },

    async registerVehicle(req, res){

        res.render('../views/registerCar');
    }

}