const axios = require('axios')

const service = {

  getAllLights(knex) {
    return knex.from('lights').select('lat', 'lng', 'url', 'id', 'upvotes', 'on')
  },
  getLightById(knex, id) {
    return knex.from('lights').select('*').where('id', id).first()
  },
  getLightsByContributor(knex, user) {
    return knex.from('lights').select('*').where('user', user)
  },
  isUser(knex, id) {
    return knex.select('valid').from('users').where('id', id)
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
  toggleOn(knex, id, toggle) {
    knex.select('id').from('lights')
      .where({ id: id })
      .update({
        on: toggle
      })
      .then(rows => {
        return rows[0]
      })

  },
  deleteLight(knex, id) {
    knex.select('id').from('lights')
    .where({id})
    .delete()
    .then(rows => {
      return rows[0]
    })
  },
  sendDecisionMail(knex, id, decision) {
    let message = ''
    knex.select('name').from('users').where('id', id).then(user => {
      if (!decision.denied) {
        message += 'Congratulations ' + user[0].name.charAt(0).toUpperCase() + user[0].name.slice(1) + '!\n\nYour image passed review!!!\n\nYou should be able to see it on Lightmaps as soon as you come back to the site or refresh the page.\nThank you for your contribution!!!\n\nbest,\n\nBen @Lightmaps'
      } else {
        message += 'Sorry ' + user[0].name.charAt(0).toUpperCase() + user[0].name.slice(1) + ', your image did not pass review.\nHere is why:'
        for (const property in decision) {
          if (decision[property] !== false && decision[property] !== true) {
            message += '\n*' + decision[property] + '.'
          }
        }
      }
      knex.select('email').from('users').where('id', id).then(email => {
        axios({
          method: 'POST',
          // url: 'http://localhost:3002/send/decision',
          url: 'https://intense-ocean-22155.herokuapp.com/send/decision',
          data: {
            name: user,
            email: email[0].email,
            message: message
          }
        })
      })
    })
  },
  auditLight(result) {
    let decision = { denied: false }
    if (result.weapon > .01) {
      decision.weapon = 'Found weapon',
        decision.denied = true
    }
    if (result.alcohol > .01) {
      decision.alcohol = 'Found alcohol',
        decision.denied = true
    }
    if (result.drugs > .01) {
      decision.drugs = 'Found drugs',
        decision.denied = true
    }
    if (result.nudity.raw > .01) {
      decision.nudity1 = 'Found nudity',
        decision.denied = true
    }
    if (result.nudity.partial > .01) {
      decision.nudity2 = 'Found nudity',
        decision.denied = true
    }
    if (result.faces.length > 0) {
      decision.faces = 'Found human faces',
        decision.denied = true
    }
    // if (result.colors.dominant.r > 60 || result.colors.dominant.g > 60 || result.colors.dominant.b > 60) {
    //   decision.colors = 'Photo is too bright, make sure you are taking your photo in low light',
    //     decision.denied = true
    // }
    if (result.text.has_artificial > .01) {
      decision.text0 = 'Found artificial text',
        decision.denied = true
    }
    if (result.text.profanity.length > .0) {
      decision.text1 = 'Found profane text',
        decision.denied = true
    }
    if (result.text.personal.length > 0) {
      decision.text2 = 'Found personal text',
        decision.denied = true
    }
    if (result.text.link.length > 0) {
      decision.text3 = 'Found links',
        decision.denied = true
    }
    if (result.offensive.prob > .1) {
      decision.offensive = 'Found offensive material',
        decision.denied = true
    }
    return decision
  }
}

module.exports = service