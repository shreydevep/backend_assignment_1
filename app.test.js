const request = require('supertest')
const app = require('./app')
/** 
describe('Todos API', () => {
    it('GET / --> Check Server Online', () => {
        return request(app).get('/').expect('Content-Type', /json/).expect(200)
            .then((response) => { expect(response.body.message).toEqual("Root Endpoint of the Express App") })
    })
})

**/

describe("Todos Student Endpoint", () => {
    it('GET /api/v1/students/ --> Check Return all students in DB', () => {
        return request(app).get('/api/v1/students/').expect('Content-Type', /json/).expect(200).then((response) => {
            expect(Array.isArray(response.body.data.students_list)).toEqual(true)
        })
    })
})