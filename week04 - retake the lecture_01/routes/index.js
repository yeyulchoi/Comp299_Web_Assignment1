var express = require('express');
var router = express.Router();

let posts =[];



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('content/home', {
     title: 'Home',
     posts:posts 
    
    }); 
  
});
// When router.get is triggered,   render/create the page index inside view folder ,it goes to index.ejs file ..

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('content/home', {
     title: 'Home',
     posts:posts
    });  
 
  
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('content/about', { title: 'About Me'});     
});

/* GET Projects page. */
router.get('/projects', function(req, res, next) {
  res.render('content/projects', { title: 'Projects'});     
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('content/services', { title: 'Services'});     
});


/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('content/contact', { 
    title: 'Contact Us',
    name: 'Yeyul Choi',
    email:'yeyulchoi@outlook.com',
    phone:'6479958585'
  
  });     
});



/*POST method*/
router.post('/contact',function(req,res,next){
   const post ={
    fullname:req.body.fullname,
    contactNum:req.body.contactnumber,
    email:req.body.email,
    msg:req.body.message
  };

posts.push(post);

res.redirect('/home');
});



module.exports = router;
