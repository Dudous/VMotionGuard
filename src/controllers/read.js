const vehicle = require('../models/vehicles');
const user = require('../models/users');
const coordinates = require('../models/coordinates')
const DataBase = require('../config/db')

module.exports = {

    async home(req, res) {

        const id = req.params.id;

        const login = await user.findOne({
            raw: true,
            attributes: ['IDUser', 'Name', 'CPF', 'Email', 'Password', 'IsAdmin'],
            where: {IDUser : id}
        })
        const vehiclesUser = await vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year', 'IDUser', 'IDLoc'],
            where: {IDUser: id}})

        const users = await user.findAll({
            raw: true,
            attributes: ['IDUser', 'Name', 'CPF', 'Email', 'Password', 'IsAdmin']})
            
        const vehicles = await vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year', 'IDUser', 'IDLoc']})

        if(login.IsAdmin == 1)
            res.render('../views/homePageAdmin',{id, login, users, vehicles});
        else
            res.render('../views/homePageUser',{vehiclesUser, login});
    },

    async login(req, res) {

        const notFound = null;
        const incorrect = null;

        res.render('../views/index', {notFound, incorrect});
    },

    
    async registerUser(req, res){
    
        res.render('../views/registerUser');
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

    async editarUser(req, res) {

        const id = req.params.id;
        const admin = req.params.admin;

        const currentUser = await user.findOne({
            raw: true,
            attributes: ['IDUser', 'Name', 'CPF', 'Email', 'Password', 'IsAdmin'],
            where: {IDUser : id}
        })
       
        res.render('../views/informacoesUsers',{currentUser, admin});
    },

    async allCars(req, res){

        const id = req.params.id

        const vehicles = await vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year', 'IDUser', 'IDLoc']})

        const users = await user.findAll({
            raw: true,
            attributes: ['IDUser', 'Name', 'CPF', 'Email', 'Password', 'IsAdmin']})

        const results = await DataBase.query(`
            SELECT
            u.IDUser,
            u.Name,
            u.Email,
            u.CPF,
            v.IDVehicle,
            v.Plate,
            v.Brand,
            v.Model,
            v.Year
            FROM 
            users as u
            inner join vehicles as v
            ON u.IDUser = v.IDUser;
            `, {type: DataBase.SELECT, raw: true});

            console.log(results)
            console.log( 'resultado 1' + JSON.stringify(results[0][1]))
            

        res.render('../views/allCars', {vehicles, users, results, id});
    },

    async userCar(req, res){

        const idUser = req.params.user;

        const vehicles = await vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year', 'IDUser', 'IDLoc'],
            where: {IDUser: idUser}
        });

        console.log("car" + idUser)

        res.render('../views/userCars', {idUser, vehicles});
    },

}