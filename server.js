/*jshint esversion:8*/
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const alert = require('alert-node');
var MongoStore = require('connect-mongo')(session);

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');
const policyRouter = require('./routes/policy');
const signInRouter = require('./routes/signin');
const signUpRouter = require('./routes/signup');
const profileRouter = require('./routes/profile');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: false
}));

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/bedonHodod");
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/policy', policyRouter);
app.use('/signin', signInRouter);
app.use('/signup', signUpRouter);
 app.use('/profile',profileRouter);

app.listen(process.env.PORT || 3000);
