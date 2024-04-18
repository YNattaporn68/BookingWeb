const request = require('supertest');
const app = require('../index'); 

describe('Login', () => {
    it('should login successfully with correct credentials', async () => {
        const res = await request(app)
            .post('/auth/LoginPage')
            .send({
                username: 'testuser', 
                password: 'testpassword' 
            });
        expect(res.statusCode).toEqual(302); 
        expect(res.header['location']).toEqual('/'); // เปลี่ยนเส้นทางไปที่หน้าหลัก
    });

    it('should return an error with incorrect credentials', async () => {
        const res = await request(app)
            .post('/auth/LoginPage')
            .send({
                username: 'nonexistentuser', 
                password: 'wrongpassword' 
            });
        expect(res.statusCode).toEqual(401); 
        expect(res.text).toContain('Username or password is incorrect'); 
    });
});