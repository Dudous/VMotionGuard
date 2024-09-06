const user = require('../models/users');

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
        }
        
        const code = Math.round(Math.random() * (9999 - 1111) + 1111);

        console.log(code)

        res.render('../views/codigoRecuperacao', {incorreto: null, code})
    },

    async validateCode(req, res)
    {
        const data = req.body

        var codeDigitado = data.input1.toString() + data.input2.toString() + data.input3.toString() + data.input4.toString()

        if(codeDigitado != data.code)
            res.render('../views/codigoRecuperacao', {incorreto: 1, code : data.code})
        else
            res.render('../views/novaSenha', {valid: null})

    },

    async novaSenha(req, res)
    {
        console.log('cadastrado');
    }
}