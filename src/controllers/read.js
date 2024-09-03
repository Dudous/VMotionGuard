const vehicle = require('../models/vehicles');
const user = require('../models/users');
const coordinates = require('../models/coordinates');

module.exports = {
    
    async login(req, res) {
        
        const data = req.body;
        
        const cpf = data.userInput.replace(/[-.]/g, '');
        
        const login = await user.findOne({
            where: { CPF: cpf },
            raw: true, 
            attributes: ['IDUser', 'CPF', 'Name', 'Email', 'Password', 'IsAdmin']
        });
        
        if (login) {
            
            if (login.CPF == cpf && login.Password == data.senhaInput){
                
                if(login.IsAdmin == 1)
                    res.render('../views/homePageAdmin',{user : login});
                else
                res.render('../views/homePageUser', {user : login});
            
        } else {
            const notFound = 0;
            const incorrect = 1;
            return res.render('../views/index', {incorrect, notFound});
        }
    } else {
        const notFound = 1;
        const incorrect = 0
        return res.render('../views/index', {incorrect, notFound}); 
    }
},

    async userCar(req, res){

        const idUser = req.params.id;

        const vehicles = await vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year', 'IDUser', 'IDLoc'],
            where: {IDUser: idUser}
        });

        res.render('../views/userCars', {vehicles});
    },

    async home(req, res) {
    
        const data = req.body

        const login = await user.findAll({
            raw: true,
            attributes: ['IDUser', 'CPF', 'Email', 'Password', 'IsAdmin'],
            where: {CPF : data.CPF}
        })

        const vehiclesUser = vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year', 'IDUser', 'IDLoc'],
            where: {IDUser: login[0].IDUser}})
        
        id = login[0].IDUser

        const users = user.findAll({
            raw: true,
            attributes: ['IDUser', 'CPF', 'Email', 'Password', 'IsAdmin']})

        const vehicles = vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year', 'IDUser', 'IDLoc']})

        if(login[0].IsAdmin)
            res.render('../views/homePageAdmin',{id, users, vehicles});
        else
            res.render('../views/homePageUser', {id, vehiclesUser});
    },
    
    async registerUser(req, res){
        const users = await user.findAll({
            raw: true,
            attributes: ['IDUser', 'Email', 'Password', 'IsAdmin']
        });

        res.render('../views/registerUser', {users});
    },
    
    async vehicle(req, res){

        const coord = await vehicle.findOne({
            raw: true,
            attributes: [],
            include: [{model: coordinates,
                required: false,
                attributes: ['Latitude', 'Longitude']
            }],
            where: {IDVehicle : req.params.id}
        });

        res.render('../views/viewCar', {coord});
    },

    async registerVehicle(req, res){

        res.render('../views/registerCar');
    },

    async adminCars(req, res){

        const vehicles = await vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year', 'IDUser', 'IDLoc']
        });

        res.render('../views/adminCars',{vehicles})
    }
}