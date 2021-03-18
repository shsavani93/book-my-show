const express = require('express');
var cors = require('cors');
const bodyParser = require("body-parser");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//MongoDB connection details
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

require('./routes/auth-routes')(app);
require('./routes/movies-routes')(app);

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);