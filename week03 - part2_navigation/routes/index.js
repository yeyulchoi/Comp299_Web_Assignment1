var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home'});     
});
// When router.get is triggered,   render/create the page index inside view folder ,it goes to index.ejs file ..

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home'});     
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About'});     
});

/* GET Products page. */
router.get('/products', function(req, res, next) {
  res.render('index', { title: 'Products'});     
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services'});     
});


/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact Us'});     
});



module.exports = router;
