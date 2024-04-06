const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.SignupPage = (req, res) => {
    console.log(req.body);

    const { name, username, password, passwordConfirm } = req.body;

    db.query('SELECT username FROM users WHERE username = ?', [username], async (error, results) => {
        if(error) {
            console.log(error);
        }
        if(results.length > 0) {
            return res.render('SignupPage', {
                message: 'This username already in use'
            })
        } else if (password != passwordConfirm) {
            return res.render('SignupPage', {
                message: 'Password do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?' , {name: name, username: username, password: hashedPassword}, (error,results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('SignupPage', {
                    message: 'User registered'
                });
            }
        })
        
    });
    
}

exports.LoginPage = (req, res) => {
    console.log(req.body);

    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.render('LoginPage', {
            message: 'Please provide both username and password'
        });
    }

    db.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) => {
        if(error) {
            console.log(error);
        }
        if(results.length == 0 || !(await bcrypt.compare(password, results[0].password))) {
            return res.status(401).render('LoginPage', {
                message: 'Username or password is incorrect'
            });
        } else {
            // Generate JWT token
            const id = results[0].id;
            const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
                expiresIn: 3600 // ให้ token มีอายุเป็น 3600 วินาที (1 ชั่วโมง)
            });

            console.log("The token is: " + token);

            // Set cookie
            const cookieOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            };

            res.cookie('jwt', token, cookieOptions);
            res.redirect('/HomePage.hbs');
        }
    });
}

exports.HomePage = (req, res) => {
    if (req.user) {
        // ถ้าผู้ใช้ล็อกอินอยู่
        const name = req.user.name; // ดึงชื่อผู้ใช้จากข้อมูลผู้ใช้ที่ถูกเก็บใน req.user หรือตามความเหมาะสม
        res.render('HomePage', { name: name }); // ส่ง name ไปยังหน้า profile.hbs
    } else {
        // ถ้ายังไม่มีการล็อกอิน
        res.render('HomePage', { name: null }); // ส่ง name เป็น null ไปยังหน้า profile.hbs
    }
}
//1234
