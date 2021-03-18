const keys = require('../config/keys');
const fetch = require('node-fetch');
const controller = require("../controllers/movies-controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    const apiKey = keys.apiKey; 

    // An api endpoint that returns a list of upcoming movies
    app.get('/api/upcomingMovies', controller.upcomingMovies);

    // An api endpoint that returns a list of now playing movies
    app.get('/api/nowPlayingMovies', controller.nowPlayingMovies);

    // An api endpoint that returns a detail of selected movie
    app.get('/api/movie/:id', controller.getMovieDetails);

    // An api endpoint that returns movies based on search result
    app.get('/api/movies/search/:query', controller.getMoviesBySearchName);


    // An api endpoint that returns videos for the selected movie
    app.get('/api/movie/:id/videos', controller.getMovieVideos);
};