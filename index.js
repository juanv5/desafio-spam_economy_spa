const enviar = require('./mailer')
const url = require('url')
const http = require('http')
const fs = require('fs')
const getData = require('./getData')
const { v4: uuidv4 } = require('uuid')


const datosMail = (req) => {
    const { correos, asunto, contenido } = url.parse(req.url, true).query
    return { correos, asunto, contenido }
}

http
    .createServer(async function(req, res) {
        let { correos, asunto, contenido } = url.parse(req.url, true).query
        if (req.url == '/') {
            res.setHeader('content-type', 'text/html')


            fs.readFile('index.html', 'utf8', (err, data) => {
                res.end(data)
            })
        }
        if (req.url.startsWith('/mailing')) {
            const data = await getData()
            const { correos, asunto, contenido } = await datosMail(req)

            const dolar = data.dolar.valor
            const euro = data.euro.valor
            const uf = data.uf.valor
            const utm = data.utm.valor

            const mensaje = `El valor del dolar el dia de hoy es: ${dolar} <br> El valor del euro el dia de hoy es: ${euro} <br> El valor de la uf el dia de hoy es: ${uf}<br> El valor de la utm el dia de hoy es: ${utm}`

            if (correos !== '' && asunto !== '' && contenido !== '') {

                enviar(correos.split(','), asunto, contenido + mensaje)
                fs.writeFile(`./correos/$ { uuidv4() }.txt `, `$ {contenido + mensaje} `, (err) => {


                    if (err) console.log(err)
                    else console.log('archivo creado')
                })
                res.end('emails enviados, revide la bandeja de correos')
            } else {
                res.end('faltan campos por llenar')
            }

        }

    })
    .listen(3000)