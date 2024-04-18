const authController = require('../controllers/auth');

describe('Login Controller', () => {
  it('renders HomePage with name when user logged in', async () => {
    const req = {
      user: {
        name: 'TestUser'
      }
    };
    const res = {
      render: jest.fn()
    };

    authController.LoginPage(req, res);

    expect(res.render).toHaveBeenCalledWith('HomePage', { name: 'TestUser' });
  });

  it('renders LoginPage without name when user not logged in', async () => {
    const req = {
      user: null
    };
    const res = {
      render: jest.fn()
    };

    authController.LoginPage(req, res);

    expect(res.render).toHaveBeenCalledWith('LoginPage');
  });
});
