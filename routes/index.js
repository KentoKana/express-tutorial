//Routes to all the view files.
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.cookies.username) {
    res.render('index', {
      name: req.cookies.username
    });
  } else {
    res.redirect('logout')
  }
});

router.post('/', (req, res) => {
  console.dir(req.body);
  res.cookie('username', req.body.username);
  res.render('index', {
    name: req.body.username
  });
});

router.post('/logout', (req, res) => {
  res.clearCookie('username');
  res.redirect('login');
});

router.use('/logout', (req, res, next) => {
  req.message = "You have logged out";
  console.log(req.message);
  next();
});

router.get('/login', (req, res) => {
  if (req.cookies.username) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

router.get('/logout', (req, res) => {
  if (!req.cookies.username) {
    res.redirect('/login');
  }
});

router.post('/login', (req, res) => {
  res.cookie('username', req.body.username)
  res.redirect('/');
});

module.exports = router;
