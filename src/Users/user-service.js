const axios = require('axios')

const service = {

    getAllUsers(knex) {
        //fix this
        return knex.from('users').select('name', 'email', 'hash')
    },
    getUserByEmail(knex, email) {
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
            // url: "http://localhost:3002/send",
            url: "https://intense-ocean-22155.herokuapp.com/send",
            data: {
                name: name,
                email: email,
                message: "please enter this code into the field to validate your email\n" + code
            }
        })
    },toggleValid(knex, email){
        knex.select('email').from('users')
        .where({email: email})
        .update({ valid: '1' })
        .then(data => console.log(data))



    }
}

module.exports = service