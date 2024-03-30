const express = require('express'); // This is the express module
const mysql = require("mysql");
const dotenv = require('dotenv');
dotenv.config();
// const hbs = require('hbs');
const generalRouter = require('./routers/general'); // This is the router we created

dotenv.config({ path: './.env'});

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


db.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MySQL Connected.")
    }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'hbs');
app.use('/styles', express.static('styles'));

app.use('/', generalRouter); // This is the default route
app.use('/HomePage.hbs', generalRouter); 
app.use('/LoginPage.hbs', generalRouter);
app.use('/SignupPage.hbs', generalRouter);
app.use('/rongron.hbs', generalRouter);
app.use('/rongyen-1.hbs', generalRouter);
app.use('/rongyen-2.hbs', generalRouter);
app.use('/ConfirmPage.hbs', generalRouter);
app.use('/Endpoint.hbs', generalRouter);

app.use('/auth', require('./routers/auth'));

app.listen(9989, () => { 
    console.log('Server is running on http://localhost:9989') 
});