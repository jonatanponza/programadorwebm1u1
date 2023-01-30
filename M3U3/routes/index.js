var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Turismo Aventura' });
});

router.post('/', async (req, res, next) => {
  
  var nombre = req.body.nombre
  var apellido = req.body.apellido
  var email = req.body.email
  var tel = req.body.tel
  var mensaje = req.body.mensaje

  var obj = {
    to: 'pepito@gmail.com',
    subject: 'Contacto Aventura',
    html: nombre +' '+ apellido + ' se contacto para mas información, su correo es: ' + email + ' y su telefono: ' + tel + '. <br> Su mensaje es: ' + mensaje
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado correctamente'
  });
});

module.exports = router;
