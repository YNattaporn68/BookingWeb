const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
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

module.exports = router;