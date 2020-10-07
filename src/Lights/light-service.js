const service = {

  getAllLights(knex) {
    return knex.from('lights').select('lat', 'lng', 'url', 'id','upvotes')
  },
  getLightById(knex, id) {
    return knex.from('lights').select('*').where('id', id).first()
  },
}

module.exports = service