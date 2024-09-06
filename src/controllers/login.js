const user = require('../models/users');
const { createHmac } = require('node:crypto');

module.exports = {

    async recuperarSenha(req, res)
    {

        const cpf = req.body.cpf.replace(/[-.]/g, '')

        const finduser = await user.findOne({
            where: { CPF: cpf },
            raw: true, 
            attributes: ['IDUser']
        });
        
        if(!finduser)
        {
            let naoEncontrado = 1;
            res.render('../views/recuperarSenha', {naoEncontrado})
            return
        }
        
        const code = Math.round(Math.random() * (9999 - 1111) + 1111);

        console.log(code)

        //Implementação API WhattsApp


        res.render('../views/codigoRecuperacao', {incorreto: null, code, id: finduser.IDUser})
    },

    async validateCode(req, res)
    {
        const data = req.body

        var codeDigitado = data.input1.toString() + data.input2.toString() + data.input3.toString() + data.input4.toString()

        if(codeDigitado != data.code)
            res.render('../views/codigoRecuperacao', {incorreto: 1, code : data.code, id: req.params.id})
        else
            res.render('../views/novaSenha', {valid: null, id: req.params.id})

    },

    async novaSenha(req, res, next)
    {
        senha = createHmac('sha256', req.body.senha).digest('hex')

        user.update(
            {Password: senha,},
            {where: {IDUser: req.body.id}})
            .then(result => {
                console.log(result)
            })

        res.redirect('/')
    }
}