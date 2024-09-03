const { where } = require('sequelize');
const vehicle = require('../models/vehicles');
const user = require('../models/users');
const { raw } = require('express');
const { attMap } = require('./map');

module.exports = {

    async login(req, res){
        const notFound = ''
        const incorrect = ''

        res.render('../views/index',{notFound, incorrect});
    },

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
            res.render('../views/homePageUser',{id, vehiclesUser, login});
    },
    
    async registerUser(req, res){
    
        res.render('../views/registerUser');
    },
    
    async vehicle(req, res){

        res.render('../views/index');
    },

    async registerVehicle(req, res){

        res.render('../views/registerCar');
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

}