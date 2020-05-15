const express = require("express");
const morgan = require("morgan");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(morgan("common")); // let's see what 'common' format looks like

const apps = require("./playstore.js");

app.get("/apps", (req, res) => {
const { sort, genre } = req.query;

if (sort) {
  if (!["Rating", "App"].includes(sort)) {
    return res.status(400).send("Sort must be one of Rating or App");
  }
}

if (genre) {
  if (!["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(genre)) {
    return res.status(400).send("Genre must be one of action, puzzle, strategy, casual, arcade, or card.");
  }
}
let results = apps.filter(app => {
  if(!genre){
    return true
  } 
  console.log(app.Genres.split(';'))
  return app.Genres.split(';').includes(genre)});


if (sort) {
  results.sort((a, b) => {
    return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
  });
}

res.status(200).send(results);

})

module.exports = app;
