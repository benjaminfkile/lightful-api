const service = {

  getAllLights(knex) {
    return knex.from('lights').select('lat', 'lng', 'url', 'id','upvotes')
  },
  insertLight(knex, newLight) {
    return knex
      .insert(newLight)
      .into('lights')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getLightById(knex, id) {
    return knex.from('lights').select('*').where('id', id).first()
  },
  deleteLight(knex, id) {
    return knex('lights')
      .where({ id })
      .delete()
  },
}

module.exports = service