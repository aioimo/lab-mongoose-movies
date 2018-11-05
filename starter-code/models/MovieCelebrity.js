const mongoose = require('mongoose');
const Schema = mongoose.Schema

const movieCelebritySchema = new Schema({
  _movie: {type: Schema.Types.ObjectId, ref: "Movie"},
  _celebrity: {type: Schema.Types.ObjectId, ref: "Celebrity"}
})

const MovieCelebrity = mongoose.model('MovieCelebrity', movieCelebritySchema);

module.exports = MovieCelebrity;