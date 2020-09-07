const service = {

  getAllLights(knex) {
    return knex.select('*').from('review')
  },
  insertLight(knex, newLight) {
    return knex
      .insert(newLight)
      .into('review')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getLightById(knex, id) {
    return knex.from('review').select('*').where('id', id).first()
  },
  deleteLight(knex, id) {
    return knex('review')
      .where({ id })
      .delete()
  },
}

module.exports = service