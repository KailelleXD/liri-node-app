require("dotenv").config();

var keys = require("./keys.js");
var request = require('request');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var inquirer = require('inquirer');
var fs = require("fs");

// Variable for switch statement, to determine function that the user wants to use.
var cmd = process.argv[2];
var userArg = process.argv[3];

// Below is the syntax used to access my API keys for this project while keeping them private to users online.
// var spotify = new Spotify(keys.spotify);

var artist = process.argv[3];

// console.log(queryURL);

// node liri.js concert-this <"name of artist">
// function to query the bandsintown API and display pertinent information.
function concertThis() {
    // Using inquirer, ask for the user to input an artist(s) name, assign that input to the variable artist, and call the concertThis(); function.
    
    // Use request package to query bandsintown API.
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    request(queryURL, function(err, res, body) {
        // If the request was successful...
      if (!err && res.statusCode === 200) {
    
        // Then log the body from the site!
        // console.log(body);
    
        var obj = JSON.parse(body);
    
        // console.log(obj[0].venue.name);
            console.log(" ");
            console.log("Here are some upcoming events involving: " + artist)
            console.log("--------------------------------------------------");
    
            for (let i = 0; i < obj.length; i++) {
    
                // use moment.js to change the event date format to MM/DD/YYYY
                var showDate = moment(obj[i].datetime).format('L');
    
                console.log(" ");
                console.log("Venue: " + obj[i].venue.name);
                console.log("Location: " + obj[i].venue.city + " " + obj[i].venue.region);
                console.log("Date: " + showDate);
                console.log("-----------------------");
            }
        }  
    });
} /// concertThis();

// node liri.js spotify-this-song <"name of song">
// function to query the spotify API and display pertinent information.
function spotifyThisSong() {

    if (userArg === undefined) {
        userArg = "Ace of Base The Sign";
    }

    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
        });
        spotify.search({ type: 'track', query: userArg}, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var artistInfo = data.tracks.items[0].artists;
        var songTitle = data.tracks.items[0].name;
        var extLink = data.tracks.items[0].external_urls.spotify;
        var albumName = data.tracks.items[0].album.name;
        console.log(" ");
        console.log("Spotify-ing the song: " + songTitle)
        console.log("--------------------------------------------------");
        console.log("Artist(s): " + artistInfo[0].name);
        console.log("Song Title: " + songTitle);
        console.log("Click link to listen! " + extLink);
        console.log("Album name: " + albumName);
        console.log("--------------------------------------------------");
        });
} /// spotifyThisSong();

// node liri.js movie-this <"name of movie">
// function to query the omdb API and display pertinent information.
function movieThis() {

    if (userArg === undefined) {
        userArg = "Mr. Nobody";
    }

    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + userArg
    request(queryURL, function(err, res, body) {
        // If the request was successful...
      if (!err && res.statusCode === 200) {
    
        var obj = JSON.parse(body);

        console.log(" ");
        console.log("Below is information about the movie: " + obj.Title);
        console.log("-----------------------");
        console.log("Title: " + obj.Title);
        console.log("Year of Release: " + obj.Year);

        for (let i = 0; i < obj.Ratings.length; i++) {
            console.log(obj.Ratings[i].Source + ": " + obj.Ratings[i].Value);
        }

        console.log("Country of Origin: " + obj.Country);
        console.log("Language: " + obj.Language);
        console.log("-----------------------");
        console.log("Plot Summary: " + obj.Plot);
        console.log("Actors: " + obj.Actors);
        console.log("-----------------------");

        }  
    });



        // movie-this <movie name here>
        // This will output the following information to your terminal/bash window.
            // Title of the movie.
            // Year of release.
            // IMDB Rating of the movie.
            // Rotten Tomatoes Rating of the movie.
            // Country where the movie was produced.
            // Language of the movie.
            // Plot of the movie.
            // Actors in the movie.
        // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody'
        // Use the request package to retrieve data from OMDB API. Use the bootcamp API key (trilogy)



}

// node liri.js do-what-it-says
// function to read the file random.txt and use the information contained within to run one of the liri commands.
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
          return console.log(err);
        }
    
        // console.log(data);
        var randomArr = data.split(",");

        console.log("The contents of random.txt is: " + data);

        cmd = randomArr[0];
        userArg = randomArr[1];

        cmdSwitch();
      
      });
} /// doWhatItSays();

// function to run the switch statment and call the other functions depending on the variable cmd.
function cmdSwitch() {
    switch(cmd) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
    }
} /// cmdSwitch();

// cmdSwitch(); // Commented-out to add Inquirer package functionality.

// Make the necessary revisions to the app to allow the user to interact with liri-bot using the inquirer package instead of process.argv

// Use Inquirer - List - To have the user choose between 1 of 4 options: concert-this, spotify-this-song, movie-this, and do-what-it-says.
inquirer
  .prompt([
    {
      type: 'list',
      name: 'cmd',
      message: 'Please choose 1 of 4 tasks for Liri-bot to accomplish.',
      choices: ['do-what-it-says', 'concert-this', 'spotify-this-song', 'movie-this']
    }
  ])
  .then(answers => {
    cmd = answers.cmd;
    cmdSwitch();
  });


// Using inquirer, ask for the user to input a song title, assign that input to the variable userArg, and call the spotifyThisSong(); function.
// Using inquirer, ask the user to input a movie title, assign that input to the variable userArg, and call the movieThis(); function.
// Using inquirer, change the entire function to cycle through the comma-separated values and display the options as multiple choice for the user.
    // after the user makes a selection, use the information located in the text file to run the appropriate function with the correct variable information.
