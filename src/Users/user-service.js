const axios = require('axios')

const service = {

    getAllUsers(knex) {
        return knex.from('users').select('name', 'email', 'hash')
    },
    getUserById(knex, email) {
        return knex.from('users').select('*').where('email', email).first()
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
            method: "POST",
            url: "http://localhost:3002/send",
            data: {
                name: name,
                email: email,
                message: "please enter this code into the field to validate your email\n" + code
            }
        })
    }
}

module.exports = service