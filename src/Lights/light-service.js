const axios = require('axios')

const service = {

  getAllLights(knex /*, coords*/) {
    /****************************************************************for big DB > 300 rows*****************************************************/
    // latMax = parseFloat(coords[0]) + parseInt(coords[2])
    // latMin = parseFloat(coords[0]) - parseInt(coords[2])
    // lngMax = parseFloat(coords[1]) + parseInt(coords[2])
    // lngMin = parseFloat(coords[1]) - parseInt(coords[2])
    // return knex.from('lights').select('lat', 'lng', 'url', 'id', 'upvotes', 'trips', 'uploaded', 'on', 'dummy', 'pin')
    //   .where('lat', '>', latMin)
    //   .where('lat', '<', latMax)
    //   .where('lng', '<', lngMin)
    //   .where('lng', '>', lngMax)
    /******************************************************************************************************************************************/

    /****************************************************************for little DB < 300 rows**************************************************/
    // return knex.from('lights').select('*')
    return knex.from('lights').select('lat', 'lng', 'url', 'id', 'upvotes', 'trips', 'uploaded', 'on', 'dummy', 'pin')
    /******************************************************************************************************************************************/

  },
  getLightById(knex, id) {
    return knex.from('lights').select('*').where('id', id).first()
  },
  getLightsByContributor(knex, user) {
    return knex.from('lights').select('*').where('user', user)
  },
  isUser(knex, id) {
    return knex.select('valid', 'pass').from('users').where('id', id)
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
      .where({ id })
      .delete()
      .then(rows => {
        return rows[0]
      })
  },
  sendDecisionMail(knex, id, decision) {
    let message = ''
    knex.select('name').from('users').where('id', id).then(user => {
      if (!decision.denied) {
        message += 'Congratulations ' + user[0].name.charAt(0).toUpperCase() + user[0].name.slice(1) + '!\n\nYour display passed review!!!\n\nYou should be able to see it on 406lights.com as soon as you come back to the site or refresh the page.\nThank you for your contribution!!!\n\nben@406Lights'
      } else {
        message += 'Sorry ' + user[0].name.charAt(0).toUpperCase() + user[0].name.slice(1) + ', your image did not pass review.\n\nHere is why: '
        for (const property in decision) {
          if (decision[property] !== false && decision[property] !== true) {
            message += decision[property] + ', '
          }
        }
        message += '\n\nThe purpose of the 406Lights image moderation AI is to ensure the content posted on the platform is pure and related to Christmas displays only.\n\nImage moderation is not always accurate,  I apologize if the decision is wrong.  I encourage you to reply to this email with your photo and address, if it is appropriate I will manually add it to the 406Lights platform.\n\nBest,\n\nBen @406Lights'
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
    if (result.weapon > .5) {
      decision.weapon = 'Found weapon',
        decision.denied = true
    }
    if (result.alcohol > .5) {
      decision.alcohol = 'Found alcohol',
        decision.denied = true
    }
    if (result.drugs > .5) {
      decision.drugs = 'Found drugs',
        decision.denied = true
    }
    if (result.nudity.raw > .2) {
      decision.nudity1 = 'Found raw nudity',
        decision.denied = true
    }
    if (result.nudity.partial > .3) {
      decision.nudity2 = 'Found partial nudity',
        decision.denied = true
    }
    if (result.faces.length > 0) {
      decision.faces = 'Found human faces',
        decision.denied = true
    }
    if (result.text.profanity.length > 0) {
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
    if (result.offensive.prob > .5) {
      if (result.offensive.boxes[0].label !== 'confederate') {
        decision.offensive = 'Found offensive material relating to: ' + result.offensive.boxes[0].label
        decision.denied = true
      }
    }
    return decision
  }
}

module.exports = service