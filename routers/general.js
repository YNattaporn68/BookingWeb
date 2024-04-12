const express = require('express');
const authController = require("../controllers/auth");
const router = express.Router();

router.get('/',authController.isLoggedIn, (request, response) => {
    response.render('HomePage');
  });

router.get('/HomePage.hbs', (request, response) => {
    response.render('HomePage');
  });

router.get('/SignupPage.hbs', (request, response) => {
    response.render('SignupPage');
  });

router.get('/LoginPage.hbs', (request, response) => {
    response.render('LoginPage');
  });

router.get('/rongron.hbs', (request, response) => {
    response.render('rongron');
  });
  
router.get('/rongyen-1.hbs', (request, response) => {
    response.render('rongyen-1');
  });
  
router.get('/rongyen-2.hbs', (request, response) => {
    response.render('rongyen-2');
  });

router.get('/ConfirmPage.hbs', (request, response) => {
    response.render('ConfirmPage');
  });
  
router.get('/Endpoint.hbs', (request, response) => {
    response.render('Endpoint');
  });

router.get('/profile.hbs', (request, response) => {
    response.render('profile');
});

router.get('/logout', (request, response) => {
    response.clearCookie('jwt');
    response.redirect('/');
});

module.exports = router;