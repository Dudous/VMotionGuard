const vehicle = require('../models/vehicles');
const user = require('../models/users');
const { Op } = require('sequelize');

module.exports = {

    async home(req, res) {

        const id = req.params.id;

        const login = await user.findOne({
            raw: true,
            attributes: ['IDUser', 'Name', 'CPF', 'Email', 'Password', 'IsAdmin'],
            where: {IDUser : id}
        })
        let vehiclesUser = await vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year', 'IDUser', 'Latitude', 'Longitude', 'KMs', 'Gas', 'Oil', 'Temperature', 'Battery', 'water'],
            where: {IDUser: id}})

        // vehiclesUser = JSON.stringify(vehiclesUser)
        // console.log(vehiclesUser)
            
        const vehicles = await vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year', 'IDUser', 'Latitude', 'Longitude', 'KMs', 'Gas', 'Oil', 'Temperature', 'Battery', 'water']})
        

        if(login.IsAdmin == 1){
            const users = await user.findAll({
                raw: true,
                attributes: ['IDUser', 'Name', 'CPF', 'Email', 'Password', 'IsAdmin'], where: { IDUser: { [Op.ne]: id }}});
            res.render('../views/homePageAdmin',{id, login, users, vehicles});
        } else
            res.render('../views/homePageUser',{vehiclesUser, login});
    },

    async login(req, res) {

        const notFound = null;
        const incorrect = null;

        res.render('../views/index', {notFound, incorrect});
    },

    
    async registerUser(req, res){

        res.render('../views/registerUser', {erro: null});
    },
    
    async vehicle(req, res){

        const idUser = req.params.user

        const car = await vehicle.findOne({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year', 'Latitude', 'Longitude', 'KMs', 'Gas', 'Oil', 'Temperature', 'Battery'],
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
            attributes: ['IDUser', 'Name', 'CPF', 'Email', 'Telefone', 'Password', 'IsAdmin'],
            where: {IDUser : id}
        })
       
        res.render('../views/informacoesUsers',{currentUser, admin});
    },

    async allCars(req, res){

        const id = req.params.id

        const vehicles = await vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year', 'IDUser', 'Latitude', 'Longitude', 'KMs', 'Gas', 'Oil', 'Temperature', 'Battery', 'water']})

        const users = await user.findAll({
            raw: true,
            attributes: ['IDUser', 'Name', 'CPF', 'Email', 'Password', 'IsAdmin']})
            
        res.render('../views/allCars', {vehicles, users, id});
    },

    async userCar(req, res){

        const idUser = req.params.user;

        const vehicles = await vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'KMs', 'Model', 'Year', 'IDUser'],
            where: {IDUser: idUser}
        });

        console.log("car" + idUser)

        res.render('../views/userCars', {idUser, vehicles});
    },

     async myAccount(req, res) {

        const id = req.params.id;

        const currentUser = await user.findOne({
            raw: true,
            attributes: ['IDUser', 'Name', 'CPF', 'Email', 'Telefone', 'Password', 'IsAdmin'],
            where: {IDUser : id}
        })
       
        res.render('../views/minhaConta',{currentUser, id});
    },

    async recuperarSenha(req, res) {

        let naoEncontrado = null;

        res.render('../views/recuperarSenha',{naoEncontrado})
    }

}