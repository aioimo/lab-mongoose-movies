const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity')
const Movie = require('../models/Movie')
const MovieCelebrity = require('../models/MovieCelebrity')


/* GET celebrities page */
router.get('/', (req, res, next) => {
  console.log('GET /celebrities')
  Celebrity.find()
  .then((celebrities) => {
    console.log('The celebrities have been found:', celebrities)
    let data = {celebrities}
    res.render('celebrities/index', data);
  })
  .catch((err) => {
    console.log('error finding data', err);
    res.render('error')
  })
});

//POST to add link between movie and actor
router.post('/add-movie', (req,res,next) => {
  console.log('router/post/add-movie called')
  MovieCelebrity.create({
    _movie: req.body._movie,
    _celebrity: req.body._celebrity
  })
  .then((link) => {
    res.redirect('/celebrities')
  })
  .catch((err) => {
    console.log('nope, there was an error', err)
  })
})

router.get('/:id/add-movie', (req, res, next) => {
  Celebrity.findById(req.params.id)
  .then((celebrity) => {
    console.log("celebrity:", celebrity)
    Movie.find()
    .then((movies) => {
      res.render('celebrities/add-movie', {celebrity, movies})
    })
  })
  .catch((err) => {
    console.log('There was an error')
  })
});

//POST to create new celebrity, then redirect to celebrites page
router.post('/', (req,res,next) => {
  Celebrity.create({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  })
  .then((celebrity) => {
    console.log('Celebrity created: ', celebrity);
    res.redirect('/celebrities')
  })
  .catch((err) => {
    console.log('error',err)
    res.render('celebrities/new');
  })
})

//GET to new movies page (empty form)
router.get('/new', (req,res,next) => {
  console.log('celebrities new');
  res.render('celebrities/new')
})

//POST to delete celebrity, then redirect to celebrites page
router.post('/:id/delete', (req,res,next)=> {
  Celebrity.findByIdAndDelete(req.params.id)
  .then((celebrity) => {
    console.log("celebrity deleted:", celebrity);
    res.redirect('/celebrities');
  })
  .catch((err) => {
    console.log('error',err)
  })
})

//GET to edit page for particular movie
router.get('/:id/edit', (req,res,next)=> {
  Celebrity.findById(req.params.id)
  .then((celebrity) => {
    res.render('celebrities/edit',{celebrity});
  })
  .catch((err) => {
    console.log("there was an error", err);
  })
})

//GET to show the details of particular celebrity
router.get('/:id', (req,res,next) => {
  Celebrity.findById(req.params.id)
  .then((celebrity) => {
    MovieCelebrity.find({_celebrity:req.params.id})
    .populate('_movie')
    .then((links) => {
      res.render('celebrities/show',{celebrity, links})
    })
    // console.log("the celebrity is ",celebrity);
    // res.render('celebrities/show',{celebrity})
  })
  .catch((err) => {
    console.log("error finding celebrity", err)
  })
})


// router.get('/:id', (req,res,next) => {
//   // Another way 
//   // Promise.all([Movie.findById(req.params.id),MovieCelebrity.find({_movie:req.params.id}).populate('_celebrity')])
//   Movie.findById(req.params.id)
//   .then((movie) => {
//     MovieCelebrity.find({_movie:req.params.id})
//     .populate('_celebrity')
//     .then((links) => {
//       console.log("links", links)
//       res.render('movies/show',{movie,links})
//     })    
//   })
//   .catch((err) => {
//     console.log("error finding movie", err)
//   })
// })




//POST to update celebrity, then redirect to celebrites page
router.post('/:id', (req,res,next) => {
  console.log(req.params.id)
  Celebrity.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  })
  .then((celebrity)=> {
    console.log('Celebrity updated',celebrity);
    res.redirect('/');
  })
  .catch((err)=>{
    console.log("error updating")
  })
})



module.exports = router;