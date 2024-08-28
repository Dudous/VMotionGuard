const coordinates = require('../models/coordinates')


module.exports = {
    async pagInicialGet(req, res){

        res.render('../views/index');
    },
    
    async pagInicialPost(req, res){

        const latitude = req.params.latitude;
        const longitude = req.params.longitude;

        await coordinates.create({
        Latitude: latitude,
        Longitude: longitude
        });
    }
}