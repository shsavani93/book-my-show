const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
var cors = require('cors');
const app = express();
const keys = require('./config/keys.js')

app.use(cors());

// Serve the static files from the React app
//app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a list of upcoming movies
app.get('/api/upcomingMovies', async (req, res) => {
    const apiKey = keys.apiKey; 
    const apiUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + apiKey + "&page=1";

    await fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => res.send({moviesList: data.results}))

    console.log('Sent list of upcoming movies.');
});

// An api endpoint that returns a list of now playing movies
app.get('/api/nowPlayingMovies', async (req, res) => {
    const apiKey = keys.apiKey; 
    const apiUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apiKey + "&page=1";

    await fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => res.send({moviesList: data.results}))

    console.log('Sent list of playing now movies.');
});

// An api endpoint that returns a detail of selected movie
app.get('/api/movie/:id', async (req, res) => {
    console.log("in backend")
    const apiKey = keys.apiKey; 
    console.log(req.params)
    const apiUrl = "https://api.themoviedb.org/3/movie/" + req.params.id + "?api_key=" + apiKey + "&language=en-US";

    await fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => res.send({moviesDetail: data}))
    console.log('Sent details of movies.');
});

// Handles any requests that don't match the ones above
// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);