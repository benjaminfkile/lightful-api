// const axios = require('axios')
let santaStore = []

const service = {

    getSanta() {
        if (santaStore.length > 2) {
            santaStore.length = 1
        }
        // axios.get('http://406santa.com/api/getinfo.php', {
        // }).then(santa => {
        //     santaStore.unshift(santa.data)
        // }).catch()
        santaStore.unshift('santa has left missoula')
    }, postSanta(args) {
        return santaStore[args]
    }, postPic(knex, newLight) {
        return knex
            .insert(newLight)
            .into('406pics')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }, getPics(knex) {
        return knex.from('406pics').select('*').where('active', '1')
    }
}

module.exports = service