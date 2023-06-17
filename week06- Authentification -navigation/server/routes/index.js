let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

let DB = require('../config/db');
//create the user Model instance
let userModel = require('../models/user');
let User = userModel.User; //alias

let indexController = require('../controllers/index');

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
//router.get('/home',indexController.displayHomePage);
router.get('/home', function(req, res, next) {
  res.render('content/home', {
     title: 'Home',
     posts:posts
    });  
});

/* GET about page. */
//router.get('/about',indexController.displayHomePage);

router.get('/about', function(req, res, next) {
  res.render('content/about', { title: 'About Me'});     
});

/* GET Projects page. */
//router.get('/projects',indexController.displayHomePage);
router.get('/projects', function(req, res, next) {
  res.render('content/projects', { title: 'Projects'});     
});

/* GET Services page. */
//router.get('/services',indexController.displayHomePage);
router.get('/services', function(req, res, next) {
  res.render('content/services', { title: 'Services'});     
});


/* GET Contact page. */
//router.get('/contact',indexController.displayHomePage);
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
    

 /* GET Route for displaying Login page - Create Operation duplicate? */
//  router.get('/login', async (req, res) => {
//   try {
//       // check if the user is already logged in
//       if (!req.user) {
//           res.render('auth/login', {
//               title: "Login",
//               messages: req.flash('loginMessage'),
//               displayName: req.user ? req.user.displayName : ''
//           });
//       } else {
//           res.redirect('/');
//       }
//   } catch (err) {
//       console.error(err);
//       res.status(500).send('Internal Server Error hiho');
//   }
// });




  /* GET Route for processing Login page - Create Operation     duplicate? */  
//   router.post('/register', async (req, res) => {
//     try{
//     let newBook = Book({
//       "name":req.body.name,
//       "author":req.body.author,
//       "publish":req.body.publish,
//       "description":req.body.description,
//       "price":req.body.price
//     });

//     await newBook.save();
//     res.redirect('/book-list');
//   } catch (err){
//        console.log(err);
//        res.status(500).send('Internal Server Error');
//       }
// });


//=======================================
//for authentification

/*GET route for displaying the login page */

router.get('/login', async (req, res) => {
  try {
    // Check if the user is already logged in
    if (!req.user) {
      return res.render('auth/login', {
        title: "Login",
        messages: req.flash('loginMessage'),
        displayName: req.user ? req.user.displayName : ''
      });
    } else {
      return res.redirect('/');
    }
  } catch (error) {
    // Handle the error appropriately
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

/*POST Route for processingthe login page */
                                                        


router.post('/login', async (req, res, next) => {
  try {
    passport.authenticate('local', (err, user, info) => {
      // server error?
      if (err) {
        return next(err);
      }
      // is there a user login error?
      if (!user) {
        req.flash('loginMessage', 'Authentication  What TF Error');
        return res.redirect('/login');
      }
      req.login(user, (err) => {
        // server error?
        if (err) {
          return next(err);
        }
        return res.redirect('/book-list');
      });
    })(req, res, next);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

/*GET Route for displaying the Register page */
router.get('/register', (req, res) => {
  // Check if the user is not already logged in
  if (!req.user) {
    res.render('auth/register', {
      title: 'Register',
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
  } else {
    return res.redirect('/');
  }
});


/*POST Route for processing the Register page */
                                                          //router.get('/register', (req, res) =>   to remove if necessary
                                                            //{
                                                            // Check if the user is not already logged in
                                                            //   if (!req.user) {
                                                            //     res.render('auth/register', {
                                                            //       title: 'Register',
                                                            //       messages: req.flash('registerMessage'),
                                                            //       displayName: req.user ? req.user.displayName : ''
                                                            //     });
                                                            //   } else {
                                                            //     return res.redirect('/');
                                                            //   }
                                                            // });

router.post('/register', (req, res) => {
  // Instantiate a user object
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, (err) => {
    if (err) 
    {
      console.log("Error: Inserting New User");
      if (err.name == "UserExistsError") 
      {
        req.flash('registerMessage', 'Registration Error: User Already Exists!');
        console.log('Error: User Already Exists!');
      }
      return res.render('auth/register', //to test should be auth/register
      {
        title: 'Register',
        messages: req.flash('registerMessage'),
        displayName: req.user ? req.user.displayName : ''
      });
    } else {
      // If no error exists, then registration is successful
      //redirect the user and authentificate them

      /* TO DO ; getting ready to convert to API
      res.json({success:true,msg:'User Registered Successfully!'})
      */
      return passport.authenticate('local')(req, res, () => {
        res.redirect('/book-list');
      });
    }
  });
});

module.exports.processRegisterPage = (req, res, next) => {
  // This is a separate function. Implement your specific logic here if needed.
  // It is not related to the route handlers above.
};





/*GET to perform UserLogout */

router.get('/logout', async(req,res) =>{
  req.logout();
  res.redirect('/');
})





module.exports = router;
