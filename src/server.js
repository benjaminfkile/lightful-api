const knex = require('knex')
const app = require('./app')
const { PORT, DATABASE_URL } = require('./config')
const santaService = require('./Santa/santa-service')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
})

function updateSanta(){
  santaService.getSanta()
}

// setInterval(function () {
//   updateSanta()
// }, 5000);

updateSanta()

app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})