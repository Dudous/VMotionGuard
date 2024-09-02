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
        
        console.log(login[0].IDUser)
        
        id = login[0].IDUser

        if(login[0].IsAdmin)
            res.render('../views/homePageAdmin',{id});
        else
            res.render('../views/homePageUser', {id});
    },

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
                const notFound = '';
                const incorrect = "Senha ou usuário incorretos";
                return res.render('../views/index', {incorrect, notFound});
            }
        } else {
            const incorrect = ''
            const notFound = "Usuário não existe, por favor crie sua conta";
            return res.render('../views/index', { notFound, incorrect}); 
        }
    },

    async homeUser(req, res) {

        res.render('../views/homePageUser');
    },

    async homeAdmin(req, res) {

        res.render('../views/homePageAdmin');
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