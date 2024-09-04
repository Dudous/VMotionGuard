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

        const idUser = req.params.user;

        const vehicles = await vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year', 'IDUser', 'IDLoc'],
            where: {IDUser: idUser}
        });

        console.log(idUser)

        res.render('../views/userCars', {idUser, vehicles});
    },
    
    async registerUser(req, res){
        const users = await user.findAll({
            raw: true,
            attributes: ['IDUser', 'Email', 'Password', 'IsAdmin']
        });

        res.render('../views/registerUser', {users});
    },
    
    async vehicle(req, res){

        const idUser = req.params.user

        const car = await vehicle.findOne({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year'],
            include: [{model: coordinates,
                required: false,
                attributes: ['Latitude', 'Longitude']
            }],
            where: {IDVehicle : req.params.id}
        });

        res.render('../views/viewCar', {idUser, car});
    },

    async registerVehicle(req, res){

        const user = req.params.user;

        res.render('../views/registerCar', {user});
    },

    async adminCars(req, res){

        const vehicles = await vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year', 'IDUser', 'IDLoc']
        });

        res.render('../views/adminCars',{vehicles})
    }
}