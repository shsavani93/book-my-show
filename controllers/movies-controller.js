const keys = require('../config/keys');
const fetch = require('node-fetch');
const apiKey = keys.apiKey; 

exports.upcomingMovies = async (req, res) => {
    const apiUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + apiKey + "&page=" + req.params.id;
    await fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => res.send({moviesList: data}))

    console.log('Sent list of upcoming movies.');
};


exports.nowPlayingMovies = async (req, res) => {
    const apiUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apiKey + "&page=" + req.params.id;
    await fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => res.send({moviesList: data}))

    console.log('Sent list of playing movies.');
};


exports.topRatedMovies = async (req, res) => {
    const apiUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKey + "&page=" + req.params.id;
    await fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => res.send({moviesList: data}))

    console.log('Sent list of top rated movies.');
};

exports.getMovieDetails = async (req, res) => {
    const apiUrl = "https://api.themoviedb.org/3/movie/" + req.params.id + "?api_key=" + apiKey + "&language=en-US";

    await fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => res.send({moviesDetail: data}))
    console.log('Sent details of movies.');
};

exports.getMovieCast = async (req, res) => {
    const apiUrl = "https://api.themoviedb.org/3/movie/" + req.params.id + "/credits?api_key=" + apiKey + "&language=en-US";

    await fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => res.send({moviesDetail: data}))
    console.log('Sent details of movies cast.');
};

exports.getMoviesBySearchName = async (req, res) => {
    const apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&page=1&include_adult=false&query=" + req.params.query;

    await fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => res.send({moviesList: data}))
    console.log('Sent movies for the given search query.');
};

exports.getMovieVideos = async (req, res) => {
    const apiUrl = "https://api.themoviedb.org/3/movie/" + req.params.id + "/videos?api_key=" + apiKey + "&language=en-US";

    await fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => res.send({moviesDetail: data}))
    console.log('Sent video details of movie.');
};

exports.popularMovies = async (req, res) => {
    const apiUrl = "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey + "&page=1";
    await fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => res.send({moviesList: data.results}))

    console.log('Sent list of popular movies.');
};