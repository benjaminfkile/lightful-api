const service = {


  castVote(knex, id, userId) {
    knex.select('id').from('lights')
    .where({id: id})
    .update({
      upvotes: knex.raw('array_append(upvotes, ?)', [userId])
  })

    .then(data => console.log(data))


    // console.log(id)
    // console.log(userId)
  }
}

module.exports = service