require('dotenv').config()
const LightService = require('../src/lights/light-service')
const { expect } = require('chai')
const knex = require('knex')
const chai = require('chai');
const assertArrays = require('chai-arrays');
chai.use(assertArrays);

describe(`Light service object`, function () {

    let db

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.DATABASE_URL,
        })
    })

    after(() => db.destroy())

    describe(`getAllLights()`, () => {

        it(`resolves all lights from 'lights' table`, () => {

            return LightService.getAllLights(db)
                .then(actual => {
                    expect(actual).to.be.array();
                })
        })
    })
})