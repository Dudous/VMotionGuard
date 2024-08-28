const coordinates = require('../models/coordinates')

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
    }
}