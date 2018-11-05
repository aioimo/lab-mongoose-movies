const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

const dbName = 'lab-mongoose-movies'

mongoose.connect('mongodb://localhost/' + dbName)

const dataCelebrities = [
  {
    name: "Tom Cruise",
    occupation: "Actor",
    catchPhrase: "Tom Cruise's catchphrase"
  },
  {
    name: "Elvis Presley",
    occupation: "Musician",
    catchPhrase: "I ain't nothing but a hound dog"
  },
  {
    name: "Quentin Tarantino",
    occupation: "Director",
    catchPhrase: "Whatever Tarantino says a lot"
  }
]

const dataMovies = [
  {
    title: "Pulp Fiction",
    genre: "Crime Drama",
    plot: "Many intertwined characters do stuff."
  },
  {
    title: "Being John Malkovich",
    genre: "Drama Black Comedy",
    plot: "A puppeteer finds a portal into John Malkovich's head"
  },
  {
    title: "Ghost World",
    genre: "Drama",
    plot: "Two outcasts drift through suburban hell"
  }
]

// Celebrity.create(dataCelebrities)
// .then((dataCelebrities) => {
//   console.log('The data base is updated with data: ', dataCelebrities);
// })
// .catch((err) => {
//   console.log('There was an error updating database',err)
// })

Movie.create(dataMovies)
.then((dataMovies) => {
  console.log('The data base is updated with data: ', dataMovies);
})
.catch((err) => {
  console.log('There was an error updating database',err)
})