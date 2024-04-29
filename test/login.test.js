//ผ่าน
// Test Suites: 1 passed, 1 total
// Tests:       2 passed, 2 total
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

describe('Authentication', () => {

  it('should return an error with missing credentials', async () => {
      const res = await request(app)
          .post('/auth/LoginPage')
          .send({});
      expect(res.statusCode).toEqual(200);
      expect(res.text).toContain('Please Provide an email and password');
  });
});



