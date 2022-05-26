const nodemailer = require('nodemailer')
    // Paso 1
function enviar(to, subject, html) {
    const transporter = nodemailer.createTransport({
        service: 'yahoo',
        auth: {
            user: 'palomaconbotas@yahoo.com',
            pass: 'kddpoixqhfdwfoqj',
        },
    })
    const mailOptions = {
        from: 'palomaconbotas@yahoo.com',
        to,
        subject,
        html,
    }
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) reject(err)
        if (data) resolve(data)
    })
}
// Paso 2
module.exports = enviar