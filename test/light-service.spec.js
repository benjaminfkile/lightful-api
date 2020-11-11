require('dotenv').config()
const LightService = require('../src/Lights/light-service')
const { expect } = require('chai')
const knex = require('knex')
const chai = require('chai');
const assertArrays = require('chai-arrays');
chai.use(assertArrays);

describe(`light-service object`, function () {

    let db

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.DATABASE_URL,
        })
    })

    after(() => db.destroy())

    describe(`getAllLights()`, () => {

        it(`resolves lights with a lat/lng range`, () => {

            return LightService.getAllLights(db, ["46", "-114", "3"])
                .then(actual => {
                    expect(actual).to.be.array();
                }).done()
        })
    })

    describe(`getLightById()`, () => {

        it(`resolves a light by its id`, () => {

            return LightService.getLightById(db, "4c0892ea-8461-48b4-94ad-0c052f73b641")
                .then(actual => {
                    expect(actual.id)
                }).done()
        })
    })

    describe(`getLightsByContributor()`, () => {

        it(`resolves lights by its contributor`, () => {

            return LightService.getLightsByContributor(db, "510295233cd1919aa43736c145e077a4")
                .then(actual => {
                    expect(actual).to.be.array();
                }).done()
        })
    })

    describe(`isUser()`, () => {

        it(`resolves if or if not a user is validated`, () => {

            return LightService.isUser(db, "510295233cd1919aa43736c145e077a4")
                .then(actual => {
                    expect(actual[0].valid).to.be.string("t")
                }).done()
        })
    })
})