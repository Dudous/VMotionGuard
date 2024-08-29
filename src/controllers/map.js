const coordinates = require('../models/coordinates')

module.exports = {
    async map(req, res){

        res.render('../views/index');
    },
    
    async attMap(req, res){

        const latitude = req.params.latitude;
        const longitude = req.params.longitude;

        await coordinates.create({
        Latitude: latitude,
        Longitude: longitude
        });
    }
}