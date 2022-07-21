const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const userController = require('./controllers/userController');
const awardController = require('./controllers/awardController');

const app = express();
const port = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

// set user permission
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}));

app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash('errorMessage');
  next();
});

// router
app.get('/', userController.home);
app.get('/result', userController.result);
app.get('/dashboard', userController.dashboard);
app.get('/logout', userController.handleLogout);
app.get('/login', userController.login);
app.post('/login', userController.handleLogin);

app.get('/update/:id', awardController.update);
app.post('/update/:id', awardController.handleUpdate);
app.get('/delete/:id', awardController.handleDelete);
app.post('/add', awardController.handleAdd);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
