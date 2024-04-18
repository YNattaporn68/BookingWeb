const request = require('supertest');
const app = require('../index');

describe('GET /SignupPage', () => {
  it('responds with 200 status and renders SignupPage', async () => {
    const res = await request(app)
      .get('/SignupPage.hbs')
      .expect('Content-Type', /html/)
      .expect(200);

    expect(res.text).toContain('Sign up');
  });
});
