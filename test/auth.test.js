const request = require('supertest');
const app = require('../index'); // ปรับเปลี่ยนเส้นทางไปยังไฟล์ index.js ของคุณ

describe('Login', () => {
    it('should login successfully with correct credentials', async () => {
        const res = await request(app)
            .post('/auth/LoginPage')
            .send({
                username: 'testuser', // แก้ไขเป็นชื่อผู้ใช้ที่มีอยู่ในฐานข้อมูลของคุณ
                password: 'testpassword' // แก้ไขเป็นรหัสผ่านที่ถูกต้องสำหรับชื่อผู้ใช้ดังกล่าว
            });
        expect(res.statusCode).toEqual(302); // 302 คือรหัสสถานะของการเปลี่ยนเส้นทาง
        expect(res.header['location']).toEqual('/HomePage.hbs'); // ตรวจสอบว่าได้เปลี่ยนเส้นทางไปที่ HomePage.hbs หรือไม่
    });

    it('should return an error with incorrect credentials', async () => {
        const res = await request(app)
            .post('/auth/LoginPage')
            .send({
                username: 'nonexistentuser', // แก้ไขเป็นชื่อผู้ใช้ที่ไม่มีอยู่ในฐานข้อมูลของคุณ
                password: 'wrongpassword' // แก้ไขเป็นรหัสผ่านที่ไม่ถูกต้องสำหรับชื่อผู้ใช้ดังกล่าว
            });
        expect(res.statusCode).toEqual(401); // 401 คือรหัสสถานะของการไม่อนุญาต
        expect(res.text).toContain('Username or password is incorrect'); // ตรวจสอบว่าข้อความแจ้งเตือนถูกส่งกลับมาหรือไม่
    });
});