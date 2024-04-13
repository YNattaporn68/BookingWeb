const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require("util");

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
                return res.redirect('/');
            }
        })
        
    });
    
}

exports.LoginPage = (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.render('LoginPage', {
                message: "Please Provide an email and password"
            })
        }
        db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
            console.log(results);
            if (!results || !await bcrypt.compare(password, results[0].password)) {
                res.render('LoginPage', {
                    message: 'Email or Password is incorrect'
                })
            } else {
                const id = results[0].id;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("the token is " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('userSave', token, cookieOptions);
                res.status(200).redirect("/");
            }
        })
    } catch (err) {
        console.log(err);
    }
}

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.userSave) {
        try {
            // 1. Verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.userSave,
                process.env.JWT_SECRET
            );
            console.log(decoded);

            // 2. Check if the user still exist
            db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, results) => {
                console.log(results);
                if (!results) {
                    return next();
                }
                req.user = results[0];
                return next();
            });
        } catch (err) {
            console.log(err)
            return next();
        }
    } else {
        next();
    }
}

exports.logout = (req, res) => {
    // เคลียร์คุกกี้ที่เกี่ยวข้องกับการ login
    res.clearCookie('userSave');
    // ส่งผู้ใช้กลับไปยังหน้า SignupPage.hbs
    res.redirect('/SignupPage.hbs');
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
