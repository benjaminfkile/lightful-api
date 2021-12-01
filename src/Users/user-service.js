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
            url: `${process.env.REACT_APP_EMAIL_API_URL}/send/validation`,
            data: {
                name: name,
                email: email,
                message: `Please follow this link to validate your email \n ${process.env.VALIDATE_URL_ORIGIN}/verify/&email=${email}&code=${code}`
            }
        })

    },
    sendResetMail(name, email, code) {
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_EMAIL_API_URL}/send/validation`,
            data: {
                name: name,
                email: email,
                message: `Please follow this link to reset your password \n ${process.env.VALIDATE_URL_ORIGIN}/reset/&email=${email}&code=${code}`
            }
        })

    },
    changePass(knex, email, pass) {
        knex.select('pass').from('users')
            .where({ email: email })
            .update({ pass: pass })
            .then(rows => {
                return rows[0]
            })
    },
    changeCode(knex, id, code) {
        knex.select('id').from('users')
            .where({ id: id })
            .update({ code: code })
            .then(rows => {
                return rows[0]
            })
    },
    toggleValid(knex, email) {
        knex.select('email').from('users')
            .where({ email: email })
            .update({ valid: 't' })
            .then(rows => {
                return rows[0]
            })
    },
    banUser(knex, email) {
        knex.select('email').from('users')
            .where({ email: email })
            .update({ ban: 't' })
            .then(rows => {
                return rows[0]
            })
    }
}

module.exports = service