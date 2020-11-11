const service = {


  castVote(knex, id, userId) {
    knex.select('id').from('lights')
      .where({ id: id })
      .update({
        upvotes: knex.raw('array_append(upvotes, ?)', [userId])
      })
      .then(rows => {
        return rows[0]
      })
  },
  dropVote(knex, id, userId) {
    knex.select('id').from('lights')
      .where({ id: id })
      .update({
        upvotes: knex.raw('array_remove(upvotes, ?)', [userId])
      })
      .then(rows => {
        return rows[0]
      })
  },
  castTrip(knex, id, tripId) {
    knex.select('id').from('lights')
      .where({ id: id })
      .update({
        trips: knex.raw('array_append(trips, ?)', [tripId])
      })
      .then(rows => {
        return rows[0]
      })
  },
}

module.exports = service