const express = require('express');
const router  = express.Router();
const Movie = require('../models/Movie')
const Celebrity = require('../models/Celebrity')
const MovieCelebrity = require('../models/MovieCelebrity')

/* GET Movies page */
router.get('/', (req, res, next) => {
  console.log('GET /movies')
  Movie.find()
  .then((movies) => {
    console.log('The movies have been found:', movies)
    res.render('movies/index', {movies});
  })
  .catch((err) => {
    console.log('error finding data', err);
    res.render('error')
  })
});

//POST to add link between actor and movie
router.post('/add-actor', (req,res,next) => {
  console.log('router/post/add-actor called')
  MovieCelebrity.create({
    _movie: req.body._movie,
    _celebrity: req.body._celebrity
  })
  .then((link) => {
    res.redirect('/movies')
  })
  .catch((err) => {
    console.log('nope, there was an error', err)
  })
})

router.get('/:id/add-celebrity', (req, res, next) => {
  Movie.findById(req.params.id)
  .then((movie) => {
    console.log("movie:", movie)
    Celebrity.find()
    .then((celebrities) => {
      res.render('movies/add-celebrity', {movie, celebrities})
    })
  })
  .catch((err) => {
    console.log('There was an error')
  })
});



//GET to show page for creating a new movie
router.get('/new', (req,res,next) => {
  console.log('movies new');
  res.render('movies/new')
})

//GET to show details page for particular movie
router.get('/:id', (req,res,next) => {
  // Another way 
  // Promise.all([Movie.findById(req.params.id),MovieCelebrity.find({_movie:req.params.id}).populate('_celebrity')])
  Movie.findById(req.params.id)
  .then((movie) => {
    MovieCelebrity.find({_movie:req.params.id})
    .populate('_celebrity')
    .then((links) => {
      console.log("links", links)
      res.render('movies/show',{movie,links})
    })    
  })
  .catch((err) => {
    console.log("error finding movie", err)
  })
})

//POST to create new Movie, then redirect to Movies page
router.post('/', (req,res,next) => {
  Movie.create({
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot
  })
  .then((movie) => {
    console.log('Movie created: ', movie);
    res.redirect('/movies');
  })
  .catch((err) => {
    console.log('error',err)
  })
})


//POST to delete movie, then redirect to celebrites page
router.post('/:id/delete', (req,res,next)=> {
  Movie.findByIdAndDelete(req.params.id)
  .then((movie) => {
    console.log("movie deleted:", movie);
    res.redirect('/movies');
  })
  .catch((err) => {
    console.log('error',err)
  })
})

//GET to show edit page for particular movie
router.get('/:id/edit', (req,res,next)=> {
  Movie.findById(req.params.id)
  .then((movie) => {
    res.render('movies/edit',{movie});
  })
  .catch((err) => {
    console.log("there was an error", err);
  })
})

//POST to update movie, then redirect to celebrites page
router.post('/:id', (req,res,next) => {
  console.log(req.params.id)
  Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot
  })
  .then((movie)=> {
    console.log('Movie updated',movie);
    res.redirect('/movies');
  })
  .catch((err)=>{
    console.log("error updating")
  })
})


module.exports = router;