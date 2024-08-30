const { where } = require('sequelize');
const vehicle = require('../models/vehicles');
const user = require('../models/users');
const { raw } = require('express');
const { attMap } = require('./map');

module.exports = {

    async home(req, res) {

        const data = req.body

        const login = await user.findAll({
            raw: true,
            attributes: ['IDUser', 'CPF', 'Email', 'Password', 'IsAdmin'],
            where: {CPF : data.CPF}
        })
        
        id = login[0].IDUser

        if(login[0].IsAdmin)
            res.render('../views/homePageAdmin',{id});
        else
            res.render('../views/homePageUser', {id});
    },
    
    async registerUser(req, res){
        res.render('../views/registerUser');
    },
    
    async vehicle(req, res){

        const vehicles = await vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year'],
            where: {IDUser : req.params.id}
        });

        res.render('../views/index', {vehicles});
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