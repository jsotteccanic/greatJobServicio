const functions = require('firebase-functions');
const nodemailer = require("nodemailer");
const admin = require('firebase-admin');
const cors = require('cors')({
    origin: true
});

admin.initializeApp();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jsotteccanic@gmail.com',
        pass: 'S0tteccani'
    }
});

exports.helloWorld = functions.https.onRequest((request, response) => {
    cors(request, response, () => {});
    let mailOptions = {
        from: 'Reconocimiento ADP <gj@adp.com.pe>',     //Correo desde el que envía
        to: request.body.destino,            //Correo destino
        subject: "Tienes un reconocimiento ✔",     //Titulo del correo
        text: "",       //Cuerpo del correo (Mensaje)
        html: `<div>
            <h2>${request.body.tipo}</h2>
            <p>${request.body.mensaje}</p>
            <img src="${request.body.url}">
        </div>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            response.status(500).send(error);
        } else {
            response.status(200).send("Su mensaje está en camino!");
        }
    });
});




