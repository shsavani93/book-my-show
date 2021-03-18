const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
var cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const keys = require('./config/keys.js')

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


require('./routes/auth-routes')(app);


const db = require("./models/db-connection");
const dbConfig = require("./config/db");
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

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
    const apiKey = keys.apiKey; 
    const apiUrl = "https://api.themoviedb.org/3/movie/" + req.params.id + "?api_key=" + apiKey + "&language=en-US";

    await fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => res.send({moviesDetail: data}))
    console.log('Sent details of movies.');
});

// An api endpoint that returns movies based on search result
app.get('/api/movies/search/:query', async (req, res) => {
    const apiKey = keys.apiKey; 
    const apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&page=1&include_adult=false&query=" + req.params.query;

    await fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => res.send({moviesList: data}))
    console.log('Sent movies for the given search query.');
});


app.get('/api/movie/:id/videos', async (req, res) => {
    const apiKey = keys.apiKey; 
    const apiUrl = "https://api.themoviedb.org/3/movie/" + req.params.id + "/videos?api_key=" + apiKey + "&language=en-US";

    await fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => res.send({moviesDetail: data}))
    console.log('Sent video details of movie.');
});

// Handles any requests that don't match the ones above
// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);