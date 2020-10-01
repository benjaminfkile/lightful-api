const service = {

  getAllLights(knex) {
    return knex.from('lights').select('lat', 'lng', 'url', 'id')
  },
}

module.exports = service