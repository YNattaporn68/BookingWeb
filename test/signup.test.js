//pass
// Test Suites: 1 passed, 1 total
// Tests:       4 passed, 4 total
const request = require('supertest');
const app = require('../index'); // เรียกใช้แอปของคุณ (เปลี่ยนตามชื่อและที่ตั้งของแอปของคุณ)

describe('Signup Page', () => {
    // เทสกรณีที่มีชื่อผู้ใช้งานแล้วในฐานข้อมูล
    it('should return error message if username already exists', async () => {
        const userData = {
            name: 'John Doe',
            username: 'existing_user',
            password: 'password',
            passwordConfirm: 'password'
        };

        const res = await request(app)
            .post('/auth/SignupPage')
            .send(userData);

        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('This username already in use');
    });

    // เทสกรณีที่รับข้อมูลจากฟอร์มสมัครสมาชิกได้ถูกต้อง
    it('should return status 200 and render SignupPage if form data is valid', async () => {
        const userData = {
            name: 'John Doe',
            username: 'valid_user',
            password: 'password',
            passwordConfirm: 'password'
        };

        const res = await request(app)
            .post('/auth/SignupPage')
            .send(userData);

        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Sign up Page');
    });

    // เทสกรณีที่ฟอร์มสมัครสมาชิกถูกส่งไปยังเซิร์ฟเวอร์อย่างถูกต้อง
    it('should return status 404 if the signup endpoint does not exist', async () => {
        const userData = {
            name: 'John Doe',
            username: 'valid_user',
            password: 'password',
            passwordConfirm: 'password'
        };

        const res = await request(app)
            .post('/auth/NonExistingSignupPage') // เปลี่ยนเป็น URL ที่ไม่มีอยู่จริง
            .send(userData);

        expect(res.statusCode).toEqual(404);
    });
    
});
describe('GET /SignupPage', () => {
  it('responds with 200 status and renders SignupPage', async () => {
    const res = await request(app)
      .get('/SignupPage.hbs')
      .expect('Content-Type', /html/)
      .expect(200);

    expect(res.text).toContain('Sign up');
  });
});


