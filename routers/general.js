const express = require('express');
const authController = require("../controllers/auth");
const router = express.Router();

router.get('/', authController.isLoggedIn, (request, response) => {
  if (request.user) {
      // ถ้าผู้ใช้ล็อกอินอยู่แล้วให้ไปที่หน้า HomePage.hbs
      response.render('HomePage', { name: request.user.name });
  } else {
      // ถ้ายังไม่มีการล็อกอินให้ไปที่หน้า SignupPage.hbs
      response.render('SignupPage');
  }
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

router.get('/rongron.hbs', authController.isLoggedIn, (request, response) => {
    response.render('rongron');
});

router.get('/rongyen-1.hbs', authController.isLoggedIn, (request, response) => {
    response.render('rongyen-1');
});

router.get('/rongyen-2.hbs', authController.isLoggedIn, (request, response) => {
    response.render('rongyen-2');
});

router.get('/ConfirmPage.hbs', authController.isLoggedIn, (request, response) => {
    response.render('ConfirmPage');
});

router.get('/Endpoint.hbs', authController.isLoggedIn, (request, response) => {
    response.render('Endpoint');
});

router.get('/profile.hbs', authController.isLoggedIn, (request, response) => {
    response.render('profile');
});

router.get('/logout', (request, response) => {
  response.clearCookie('jwt');
  response.redirect('/SignupPage.hbs');
});

module.exports = router;