const { where } = require('sequelize');
const vehicle = require('../models/vehicles');
const user = require('../models/users');
const { raw } = require('express');
const { attMap } = require('./map');

module.exports = {

    async login(req, res){
        const notFound = ''
        const incorrect = ''

        const users = await user.findAll({
            raw: true,
            attributes: ['IDUser', 'CPF', 'Email', 'Password', 'IsAdmin']})

        res.render('../views/index',{notFound, incorrect, users});
    },

    async home(req, res) {

        const id = req.params.id;

        const login = await user.findAll({
            raw: true,
            attributes: ['IDUser', 'CPF', 'Email', 'Password', 'IsAdmin'],
            where: {IDUser : id}
        })
        const vehiclesUser = await vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year', 'IDUser', 'IDLoc'],
            where: {IDUser: id}})
        
        console.log( "LOGIN" + login[0].IDUser)
        console.log( "LOGIN2" + login.IDUser)

        const users = await user.findAll({
            raw: true,
            attributes: ['IDUser', 'CPF', 'Email', 'Password', 'IsAdmin']})
        const vehicles = await vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year', 'IDUser', 'IDLoc']})

        if(login.IsAdmin == 1)
            res.render('../views/homePageAdmin/'+ id ,{id, login, users, vehicles});
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