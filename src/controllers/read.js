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
        const vehiclesUser = vehicle.findAll({
            raw: true,
            attributes: ['IDVehicle', 'Plate', 'Brand', 'Model', 'Year', 'IDUser', 'IDLoc'],
            where: {IDUser: login[0].IDUser}})
        
        console.log(login[0].IDUser)
        
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

    // async homeUser(req, res) {

    //     res.render('../views/homePageUser');
    // },

    // async homeAdmin(req, res) {

    //     res.render('../views/homePageAdmin');
    // },
    
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

}