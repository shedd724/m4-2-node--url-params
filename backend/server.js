"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser =require('body-parser');
const topSongs = require('./data/top50')

const getNames = (name) =>{
  let res = name.split(" featuring ")
  .map(e => e.split(" and "))
  return res.flat()
}

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get('/top50', (req, res) =>{
    let {top50} = topSongs
    let data = top50
    res.status(200).json({data})
  })

  .get('/top50/artist', (req, res) =>{
    let data = [...new Set(topSongs['top50'].map(item => item.artist) )]
    res.status(200).json({data})
  })

  .get('/top50/popular-artist', (req, res) =>{
    const countOccurrences = arr => arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
    const maxInObj = (myobj) => Object.keys(myobj).reduce(function(a, b){ return myobj[a] > myobj[b] ? a : b });

    let winner = maxInObj(countOccurrences(topSongs['top50'].map(item => getNames(item.artist)).flat()))
    let data = topSongs['top50'].filter(s => getNames(s.artist).includes(winner))
    res.status(200).json({data})
  })

  .get('/top50/song/:rank', (req, res) =>{
    let rank = parseInt( req.params.rank);
    let data = topSongs['top50'].filter(s => s['rank'] === rank)
    if(data.length > 0){
      res.status(200).json({data})
    } else{
      res.status(404).json({"message": "Song not found."})
    }
  })

  .get('/top50/artist/:singer', (req, res) =>{
    let singer = req.params.singer.toLowerCase();
    let data = topSongs['top50'].filter(s => s['artist'].toLowerCase().includes(singer))
    if(data.length > 0){
      res.status(200).json({data})
    } else{
      res.status(404).json({"message": "Song not found."})
    }
  })


  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
