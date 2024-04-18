const authController = require('../controllers/auth');

describe('Signup Controller', () => {
  it('renders HomePage with name when user signed up', async () => {
    const req = {
      user: {
        name: 'TestUser'
      }
    };
    const res = {
      render: jest.fn()
    };

    authController.SignupPage(req, res);

    expect(res.render).toHaveBeenCalledWith('HomePage', { name: 'TestUser' });
  });

  it('renders SignupPage when user not signed up', async () => {
    const req = {
      user: null
    };
    const res = {
      render: jest.fn()
    };

    authController.SignupPage(req, res);

    expect(res.render).toHaveBeenCalledWith('SignupPage');
  });
});
