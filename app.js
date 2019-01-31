const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

//Set the view engine, template language 'Pug'.
//By default, view engine will look for view file.
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  if (req.cookies.username) {
    res.render('index', {
      name: req.cookies.username
    });
  } else {
    res.redirect('logout')
  }
});

app.post('/', (req, res) => {
  console.dir(req.body);
  res.cookie('username', req.body.username);
  res.render('index', {
    name: req.body.username
  });
});

app.post('/logout', (req, res) => {
  res.clearCookie('username');
  res.redirect('login');
});

app.get('/login', (req, res) => {
  if (req.cookies.username) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

app.get('/logout', (req, res) => {
  if (!req.cookies.username) {
    res.redirect('/login');
  }
});

app.post('/login', (req, res) => {
  res.cookie('username', req.body.username)
  res.redirect('/');
});


app.listen(9001);
console.log('App listening on port 9001');
