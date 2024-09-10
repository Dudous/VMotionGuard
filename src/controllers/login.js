const user = require('../models/users');
const { createHmac } = require('node:crypto');

module.exports = {

    async recuperarSenha(req, res)
    {

        const cpf = req.body.cpf.replace(/[-.]/g, '')

        const finduser = await user.findOne({
            where: { CPF: cpf },
            raw: true, 
            attributes: ['IDUser', 'Telefone']
        });

        if(!finduser)
            {
                let naoEncontrado = 1;
                res.render('../views/recuperarSenha', {naoEncontrado})
                return
            }
            
        let telefone = finduser.Telefone

        const code = Math.round(Math.random() * (9999 - 1111) + 1111);

        console.log(code)

        //Implementação API WhattsApp

        // const mailgun = new Mailgun(formData);
        // const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || '826eddfb-48e81e5c'});
        
        // mg.messages.create('sandbox-123.mailgun.org', {
        //     from: "Excited User <mailgun@sandboxcfea7665b9c04e4d9bb493c219309988.mailgun.org>",
        //     to: ["sampaioeeduardo37@gmail.com"],
        //     subject: "Hello",
        //     text: "Testing some Mailgun awesomeness!",
        //     html: "<h1>Testing some Mailgun awesomeness!</h1>"
        // })
        // .then(msg => console.log(msg)) // logs response data
        // .catch(err => console.log(err)); // logs any error

        res.render('../views/codigoRecuperacao', {incorreto: null, code, id: finduser.IDUser, telefone})
    },

    async validateCode(req, res)
    {
        const data = req.body

        var codeDigitado = data.input1.toString() + data.input2.toString() + data.input3.toString() + data.input4.toString()

        if(codeDigitado != data.code)
            res.render('../views/codigoRecuperacao', {incorreto: 1, code : data.code, id: req.params.id, telefone: data.telefone})
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