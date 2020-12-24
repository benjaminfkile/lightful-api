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
    }
}

module.exports = service