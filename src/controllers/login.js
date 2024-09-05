const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'vmotionguard@gmail.com',
      pass: 'tfzlpwxozzbuebdc'
    },
    tls: {
        rejectUnauthorized: false
    }
  });

module.exports = {

    async forgotPassword(req, res){
        transporter.sendMail(
            {
                from: "VMotion",
                to: req.params.mail,
                subject: "Esqueceu a senha né bobão",
                text: "Hey, I'm being sent from the cloud"
            }
        )
    }
}