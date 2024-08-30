const coordinates = require('../models/coordinates')

module.exports = {
    async map(req, res){
        const msg = ''
        const notFound = ''
        const incorrect = ''

        const user = {
        name: 'Sampaio',
        id: 1,
        };

        res.render('../views/index',{user});
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