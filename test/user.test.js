const request = require('supertest');
const app = require('../index');

describe('POST /auth/SignupPage', () => {
    it('responds with 200 OK and user registered message', async () => {
        const res = await request(app)
            .post('/auth/SignupPage')
            .send({
                name: 'Test User',
                username: 'testuser123',
                password: 'testpassword',
                passwordConfirm: 'testpassword'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('User registered');
    });

    it('responds with 400 Bad Request and password do not match message', async () => {
        const res = await request(app)
            .post('/auth/SignupPage')
            .send({
                name: 'Test User',
                username: 'testuser123',
                password: 'testpassword',
                passwordConfirm: 'mismatchedpassword'
            });

        expect(res.statusCode).toEqual(400);
        expect(res.text).toContain('Password do not match');
    });

    it('responds with 400 Bad Request and username already in use message', async () => {
        // Assuming the username 'testuser123' is already in use
        const res = await request(app)
            .post('/auth/SignupPage')
            .send({
                name: 'Test User',
                username: 'testuser123',
                password: 'testpassword',
                passwordConfirm: 'testpassword'
            });

        expect(res.statusCode).toEqual(400);
        expect(res.text).toContain('This username already in use');
    });
});