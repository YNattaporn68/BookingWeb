const express = require('express'); // This is the express module
// const hbs = require('hbs');
const generalRouter = require('./routers/general'); // This is the router we created

const app = express();

app.use(express.urlencoded({ extended: true }));
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

app.listen(9989, () => { 
    console.log('Server is running on http://localhost:9989') 
});