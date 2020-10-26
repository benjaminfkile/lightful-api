const axios = require('axios')

const service = {

    getAllUsers(knex) {
        //fix this
        return knex.from('users').select('name', 'email', 'hash')
    },
    getUserByEmail(knex, email) {
        return knex.from('users').select('*').where('email', email).first()
    },
    getUserById(knex, id) {
        return knex.from('users').select('*').where('id', id).first()
    },
    insertUser(knex, newUser) {
        return knex
            .insert(newUser)
            .into('users')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    sendValidationMail(name, email, code) {
        axios({
            method: 'POST',
            // url: 'http://localhost:3002/send/validation',
            url: 'https://intense-ocean-22155.herokuapp.com/send/validation',
            data: {
                name: name,
                email: email,
                message: 'please enter this code into the field to validate your email\n' + code
            }
        })
    },toggleValid(knex, email){
        knex.select('email').from('users')
        .where({email: email})
        .update({ valid: '1' })
        .then(rows => {
            return rows[0]
        })
    }
}

module.exports = service