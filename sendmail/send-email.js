const nodemailer = require('nodemailer')

module.exports.sendEmail = (to, subject, text) => {

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAILPASSWORD
        },
        secure: true,
        tls: {
            rejectUnauthorized: false
        },
        debug: true
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        text
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            // eslint-disable-next-line no-console
            console.log(error)
        } else {
            // eslint-disable-next-line no-console
            console.log(`Email enviado para: ${mailOptions.to} \n ${info}`)
        }
    })
}
