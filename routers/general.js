const express = require('express');
const session = require('express-session');
const authController = require("../controllers/auth");
const router = express.Router();

function storeReferer(req, res, next) {
  req.session.referer = req.headers.referer;
  next();
}

router.use(session({
  secret: 'your_secret_key_here',
  resave: false,
  saveUninitialized: true
}));

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

router.get('/ConfirmPage.hbs', storeReferer, authController.isLoggedIn, (request, response) => {
  const location = request.query.location;
  // คำนวณเวลา 15 นาที
  const now = new Date();
  now.setMinutes(now.getMinutes() + 15);
  const hours = now.getHours();
  let minutes = now.getMinutes();
  // จัดรูปแบบเวลาให้เป็นสองหลัก
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const timeString = hours + ':' + minutes;
  // ส่งค่า location และ time ไปยังหน้า ConfirmPage.hbs
  response.render('ConfirmPage', { location: location, time: timeString });
});

// router.get('/Endpoint.hbs', authController.isLoggedIn, (request, response) => {
//     response.render('Endpoint');
// });

router.post('/endpoint', authController.isLoggedIn, (request, response) => {
  const location = request.body.location; // รับข้อมูล location จาก body ของคำขอ POST
  const time = request.body.time; // รับข้อมูล time จาก body ของคำขอ POST
  // ส่งข้อมูล location และ time ไปยังหน้า Endpoint.hbs
  response.render('Endpoint', { location: location, time: time });
});


router.get('/profile.hbs', authController.isLoggedIn, (request, response) => {
    response.render('profile');
});

router.get('/logout', (request, response) => {
  response.clearCookie('userSave');
  response.redirect('/SignupPage.hbs');
});

router.get('/previous-page', (req, res) => {
  // ตรวจสอบว่ามีค่า referer ใน session หรือไม่
  const referer = req.session.referer;
  if (referer) {
    // ถ้ามีให้เปลี่ยนเส้นทางไปยังหน้า referer
    res.redirect(referer);
  } else {
    // ถ้าไม่มีให้กลับไปยังหน้าหลัก
    res.redirect('/');
  }
});


module.exports = router;