const service = {

  getAllLights(knex) {
    return knex.select('*').from('lights')
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
    this.deleteLightAndBulding(knex, id)
    return knex('lights')
      .where({ id })
      .delete()
  },
}

module.exports = service