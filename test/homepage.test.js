//pass
const authController = require('../controllers/auth');

describe('HomePage Controller', () => {
  it('renders HomePage with name when user logged in', async () => {
    const req = {
      user: {
        name: 'TestUser'
      }
    };
    const res = {
      render: jest.fn()
    };

    authController.HomePage(req, res);

    expect(res.render).toHaveBeenCalledWith('HomePage', { name: 'TestUser' });
  });

  it('renders HomePage without name when user not logged in', async () => {
    const req = {
      user: null
    };
    const res = {
      render: jest.fn()
    };

    authController.HomePage(req, res);

    expect(res.render).toHaveBeenCalledWith('HomePage', { name: null });
  });
});
// Test Suites: 1 passed, 1 total
// Tests:       2 passed, 2 total
