const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/SignupPage', authController.SignupPage)
router.post('/LoginPage', authController.LoginPage)
router.post('/HomePage', authController.HomePage)
router.get('/logout', authController.logout);

module.exports = router;