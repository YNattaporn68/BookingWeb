const request = require('supertest');
const app = require('../index');

describe('GET /HomePage', () => {
  it('responds with 200 status and renders HomePage with name', async () => {
    const res = await request(app)
      .get('/HomePage.hbs') // หรือไฟล์อื่นๆ ที่ต้องการทดสอบ
      .expect('Content-Type', /html/)
      .expect(200);

    // เช็คว่าหน้า HTML มีชื่อที่ต้องการแสดงหรือไม่
    expect(res.text).toContain('Welcome');
  });

  it('responds with 200 status and renders HomePage without name', async () => {
    const res = await request(app)
      .get('/HomePage.hbs') // หรือไฟล์อื่นๆ ที่ต้องการทดสอบ
      .expect('Content-Type', /html/)
      .expect(200);

    // เช็คว่าหน้า HTML ไม่มีชื่อที่ต้องการแสดง
    expect(res.text).not.toContain('Welcome');
  });
});