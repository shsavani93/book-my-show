const keys = require('../config/keys');
const fetch = require('node-fetch');
const controller = require("../controllers/movies-controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    // An api endpoint that returns a list of upcoming movies
    // app.get('/api/upcomingMovies' , [
    //   authJwt.verifyToken
    // ], controller.upcomingMovies);
    app.get('/api/upcomingMovies/:id', controller.upcomingMovies);

    app.get('/api/popularMovies', controller.popularMovies);

    // An api endpoint that returns a list of now playing movies
    app.get('/api/nowPlayingMovies/:id', controller.nowPlayingMovies);

    // An api endpoint that returns a list of top rated movies
    app.get('/api/topRatedMovies/:id', controller.topRatedMovies);

    // An api endpoint that returns a detail of selected movie
    app.get('/api/movie/:id', controller.getMovieDetails);

    app.get('/api/movie/:id/credits', controller.getMovieCast);

    // An api endpoint that returns movies based on search result
    app.get('/api/movies/search/:query', controller.getMoviesBySearchName);


    // An api endpoint that returns videos for the selected movie
    app.get('/api/movie/:id/videos', controller.getMovieVideos);

    // An api endpoint that returns reviews for the selected movie
    app.get('/api/movie/:id/reviews', controller.getMovieReviews);

    // An api endpoint that returns similar movies for the selected movie
    app.get('/api/movie/:id/similar', controller.getSimilarMovies);
};