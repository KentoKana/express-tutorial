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

//import routers from routes folder.
const mainRoutes = require('./routes');
app.use(mainRoutes);

app.use((req, res, next) => {
  const err = new Error('Something went wrong...');
  err.status = 500;
  next();

})


app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error', err);
});

const port = 9001;
app.listen(port, () => {
  console.log('App listening on port 9001');
});
