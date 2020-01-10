const LightService = {
  getAllLights(knex) {
    return knex.select('*').from('lights')
  },
}

module.exports = LightService