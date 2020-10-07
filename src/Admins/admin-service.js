
const service = {

    insertAdmin(knex, newAdmin) {
        return knex
            .insert(newAdmin)
            .into('admins')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getAdminById(knex, uname) {
        return knex.from('admins').select('*').where('uname', uname).first()
    },
    getLightById(knex, id) {
        return knex.from('lights').select('*').where('id', id).first()
      },
    deleteLight(knex, id) {
        return knex('lights')
            .where({ id })
            .delete()
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
    deleteQueu(knex, id) {
        return knex('queu')
            .where({ id })
            .delete()
    },
}

module.exports = service