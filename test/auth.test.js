//pass
const request = require('supertest');
const app = require('../index');

describe('Authentication', () => {

    it('should return an error with missing credentials', async () => {
        const res = await request(app)
            .post('/auth/LoginPage')
            .send({});
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Please Provide an email and password');
    });
});
// Test Suites: 1 passed, 1 total
// Tests:       1 passed, 1 total