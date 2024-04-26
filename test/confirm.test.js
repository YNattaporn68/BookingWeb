//pass
const request = require('supertest');
const app = require('../index'); // นำเข้าแอปของคุณ (เปลี่ยนตามชื่อและที่ตั้งของแอปของคุณ)

describe('Confirm Page', () => {
    
    it('should submit booking data when user confirms', async () => {
        const location = 'Theater B';
        const seats = '4';
        const time = '18:45';
    
        const res = await request(app)
            .post('/endpoint') // ส่งคำขอ POST ไปยัง /endpoint
            .send({ location: location, seats: seats, time: time });
    
        expect(res.statusCode).toEqual(200); // ตรวจสอบว่าคำขอสำเร็จ
        // ตรวจสอบการทำงานเพิ่มเติมที่นี่ตามความต้องการ
    });
    
    it('should redirect to previous page when user cancels', async () => {
        const res = await request(app)
            .get('/previous-page');
    
        expect(res.statusCode).toEqual(302); // ตรวจสอบว่ามีการ redirect
        // ตรวจสอบว่าได้ redirect ไปยังหน้าที่ถูกต้องหรือไม่
    });
    // เทสกรณีที่มีข้อผิดพลาดเกิดขึ้น อย่างเช่นหน้า ConfirmPage ไม่พร้อมใช้งาน
    it('should return error if ConfirmPage is not available', async () => {
        const res = await request(app)
            .get('/NonExistingConfirmPage'); // เรียก URL ที่ไม่มีอยู่จริง
    
        expect(res.statusCode).toEqual(404); // ตรวจสอบว่าหน้าไม่พร้อมใช้งาน
    });
    
});
// Test Suites: 1 passed, 1 total
// Tests:       3 passed, 3 total
