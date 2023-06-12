let express = require('express');
let router = express.Router();
let mongoose =require('mongoose');

//connect to our Book Model
let Book = require('../models/book');
const e = require('express');

/* GET Route for the Book List page - Read Operation*/

// router.get('/', async(req, res) => {
//     Book.find().then((err,bookList) =>{
//         // console.log("BookList")
//         if (err)
//         {
//            return console.error(err);
//         }
//         else
//         {
//            res.render('book',{title:'Book List',BookList: bookList})
//         }
//     })
   

// });

router.get('/', async (req, res) => {
    try {
      const bookList = await Book.find();
      res.render('book', { title: 'Book List', BookList: bookList });
    } catch (err) {
      console.error(err);
      // handle the error in an appropriate way, such as sending an error response
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;