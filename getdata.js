const axios = require('axios')

const url = 'https://mindicador.cl/api'

const getData = async() => {
    const { data } = await axios.get(url)
    return data
        //console.log(data)
}
module.exports = getData