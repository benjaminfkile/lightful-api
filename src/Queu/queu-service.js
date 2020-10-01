const service = {

    getAllLights(knex) {
      return knex.from('queu').select('lat', 'lng', 'url', 'id', 'email', 'del')
    },
    insertLight(knex, newLight) {
      return knex
        .insert(newLight)
        .into('queu')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
    getLightById(knex, id) {
      return knex.from('queu').select('*').where('id', id).first()
    },
    deleteLight(knex, id) {
      return knex('queu')
        .where({ id })
        .delete()
    },
  }
  
  module.exports = service