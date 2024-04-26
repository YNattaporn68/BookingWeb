//ผ่าน
const request = require('supertest');
const app = require('../index');

describe('GET /LoginPage', () => {
  it('responds with 200 status and renders LoginPage', async () => {
    const res = await request(app)
      .get('/LoginPage.hbs')
      .expect('Content-Type', /html/)
      .expect(200);

    expect(res.text).toContain('Login');
  });
});
//Test Suites: 1 passed, 1 total
//Tests:       1 passed, 1 total

