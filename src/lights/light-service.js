const LightService = {
  getAllLights(knex) {
    return knex.select('*').from('lights')
  },
 
  // updateLight(knex, id, newLightFields) {
  //   return knex('lights')
  //     .where({ id })
  //     .update(newLightFields)
  // },
}

module.exports = LightService