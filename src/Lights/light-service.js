const service = {

  getAllLights(knex) {
    return knex.from('lights').select('lat', 'lng', 'url', 'id', 'upvotes')
  },
  getLightById(knex, id) {
    return knex.from('lights').select('*').where('id', id).first()
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
  auditLight(result) {
    let decision = { denied: false }

    if (result.weapon > .01) {
      decision.weapon = "Found weapon",
        decision.denied = true
    }
    if (result.alcohol > .01) {
      decision.alcohol = "Found alcohol",
        decision.denied = true
    }
    if (result.drugs > .01) {
      decision.drugs = "Found drugs",
        decision.denied = true
    }
    if (result.nudity.raw > .01) {
      decision.nudity1 = "Found nudity",
        decision.denied = true
    }
    if (result.nudity.partial > .01) {
      decision.nudity2 = "Found nudity",
        decision.denied = true
    }
    if (result.faces.length > 0) {
      decision.faces = "Found human faces",
        decision.denied = true
    }
    if (result.colors.dominant.r > 49 || result.colors.dominant.g > 49 || result.colors.dominant.b > 49) {
      decision.colors = "Photo is too bright, make sure you are taking your photo in low light",
        decision.denied = true
    }
    if (result.text.has_artificial > .01) {
      decision.text0 = "Found artificial text",
        decision.denied = true
    }
    if (result.text.profanity.length > 0) {
      decision.text1 = "Found profane text",
        decision.denied = true
    }
    if (result.text.personal.length > 0) {
      decision.text2 = "Found personal text",
        decision.denied = true
    }
    if (result.text.link.length > 0) {
      decision.text3 = "Found links",
        decision.denied = true
    }
    if (result.offensive.prob > .01) {
      decision.offensive = "Found offensive material",
        decision.denied = true
    }
    return decision
  }
}

module.exports = service