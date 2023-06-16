let express = require('express');
let router = express.Router();
let mongoose =require('mongoose');

//connect to our Book Model
let Book = require('../models/book');
const e = require('express');

/* GET Route for the Book List page - Read Operation*/
router.get('/', async (req, res) => {
    try {
      const bookList = await Book.find();
      res.render('book/list', { title: 'Books', BookList: bookList });
    } catch (err) {
      console.error(err);
      // handle the error in an appropriate way, such as sending an error response
      res.status(500).send('Internal Server Error');
    }
  });
 

 /* GET Route for displaying Add page - Create Operation*/
 router.get('/add', async (req, res) => {
  try {
    const bookList = await Book.find();
    res.render('book/add', { title: 'Add a Book' });
  } catch (err) {
    console.error(err);
    // handle the error in an appropriate way, such as sending an error response
    res.status(500).send('Internal Server Error');
  }
});

  /* GET Route for processing Add page - Create Operation*/
  router.post('/add', async (req, res) => {
    try{
    let newBook = Book({
      "name":req.body.name,
      "author":req.body.author,
      "publish":req.body.publish,
      "description":req.body.description,
      "price":req.body.price
    });

    await newBook.save();
    res.redirect('/book-list');
  } catch (err){
       console.log(err);
       res.status(500).send('Internal Server Error');
      }
});
     

 /* GET Route for displaying Edit page - Update Operation*/

// router.get('/edit/:id',(req,res,next) =>{
//   let id = req.params.id;

//   Book.findById(id, (err, bookToEdit) =>{
//     if(err)
//     {
//       console.log(err);
//       res.end(err);
//     }
//     else
//     {
//       res.render('book/edit',{title:'Edit Book',book: bookList})
//     }
    
//   });
// });

router.get('/edit/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const bookToEdit = await Book.findById(id);

    if (!bookToEdit) {
      res.status(404).send('Book not found');
      return;
    }

    res.render('book/edit', { title: 'Edit Book', book: bookToEdit });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


                                        //  router.get('/edit/:id', async (req, res) => {
                                        //   try{
                                        //     let id =req.params.id;

                                        //     Book.findById(id,(err,bookToEdit) =>{
                                        //       if(err){
                                        //         console.log(err);
                                        //         res.status(500).send(err);
                                        //       }
                                        //       else{
                                        //         //show the edit viewe
                                        //         res.render('book/edit',{title:'Edit Book',book:bookToEdit})
                                        //       }
                                        //     });
                                        //   } catch (err){
                                        //     console.error(err);
                                        //     res.status(500).send('Internal Server Error');
                                        //   }
                                        // });

/* POST Route for processing the Edit page -UPDATE Operation*/

router.post('/edit/:id', async(req,res,next) =>{
  try{
    let id= req.params.id;

    let updatedBook = {
      "_id":id,
      "name":req.body.name,
      "author":req.body.author,
      "publish":req.body.publish,
      "description":req.body.description,
      "price":req.body.price
    };

    await Book.updateOne({_id:id},updatedBook);
    res.redirect('/book-list');
  }catch(err)
  {
    console.log(err);
    res.status(500).send(err);
  }
});

  

/* GET to perform Deletion - Delete Operation*/
router.get('/delete/:id',async(req,res)=>{
  try{
    let id = req.params.id;

    await Book.deleteOne({_id:id});
    res.redirect('/book-list');
  }catch (err){
    console.log(err);
    res.status(500).send(err);
  }
});


                                                 


module.exports = router;