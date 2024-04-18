const request = require('supertest');
const app = require('../index');

describe('POST /auth/SignupPage', () => {
    it('responds with 302 Redirect and user registered message', async () => {
        const res = await request(app)
            .post('/auth/SignupPage')
            .send({
                name: 'Test User',
                username: 'testuser123',
                password: 'testpassword',
                passwordConfirm: 'testpassword'
            });

        expect(res.statusCode).toEqual(302); // เปลี่ยนจาก 200 เป็น 302 จากการ redirect
        expect(res.header['location']).toEqual('/'); // ตรวจสอบว่าได้ redirect ไปที่หน้าหลักหรือไม่
    });

    it('responds with 400 Bad Request and password do not match message', async () => {
        const res = await request(app)
            .post('/auth/SignupPage')
            .send({
                name: 'Test User',
                username: 'testuser123',
                password: 'testpassword',
                passwordConfirm: 'mismatchedpassword' // รหัสผ่านไม่ตรงกัน
            });

        expect(res.statusCode).toEqual(400); // ตรวจสอบว่ารหัสสถานะเป็น 400
        expect(res.text).toContain('Password do not match'); // ตรวจสอบข้อความที่คืนกลับว่ารหัสผ่านไม่ตรงกัน
    });

    it('responds with 400 Bad Request and username already in use message', async () => {
        // ปรับแต่งตามความเหมาะสมกับกรณีที่ต้องการทดสอบ
        const res = await request(app)
            .post('/auth/SignupPage')
            .send({
                name: 'Test User',
                username: 'testuser123', // ใช้ชื่อผู้ใช้ที่มีอยู่แล้ว
                password: 'testpassword',
                passwordConfirm: 'testpassword'
            });

        expect(res.statusCode).toEqual(400); // ตรวจสอบว่ารหัสสถานะเป็น 400
        expect(res.text).toContain('This username already in use'); // ตรวจสอบข้อความที่คืนกลับว่าชื่อผู้ใช้ซ้ำ
    });
});
