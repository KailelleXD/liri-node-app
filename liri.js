require("dotenv").config();

var keys = require("./keys.js");
var request = require('request');
var moment = require('moment');

// Variable for switch statement, to determine function that the user wants to use.
var cmd = process.argv[2];
var userArg = process.argv[3];

// Below is the syntax used to access my API keys for this project while keeping them private to users online.
// var spotify = new Spotify(keys.spotify);

var artist = process.argv[3];

// Use request package to query bandsintown API.
var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

// console.log(queryURL);

// node liri.js concert-this <"name of artist">
// function to query the bandsintown API and display pertinent information.
function concertThis() {
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // spotify-this-song <song name here>
        // This will show the following info about hte song in your terminal/bash window.
            // Artist(s)
            // The song's name
            // A preview link of the song from Spotify
            // The album that the song is from
        // If no song is provided then your program will default to 'The Sign' by Ace of Base.
        // Use the node-spotify-api package to retrieve song info from the Spotify API.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//// Switch Statement ////
switch(cmd) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        console.log("You have run: " + cmd);
        console.log("with a user defined argument of: " + userArg)
        break;
    case "movie-this":
        console.log("You have run: " + cmd);
        console.log("with a user defined argument of: " + userArg)
        break;
    case "do-what-it-says":
        console.log("You have run: " + cmd);
        console.log("with a user defined argument of: " + userArg)
        break;
}






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

    // do-what-it-says
        // Using the fs Node package, LIRI will take the text inside of the random.txt and then use it to call one of LIRI's commands.
            // It should run [spotify-this-song] for "I Want it That Way," as follows the text in random.txt
            // Edit the text in random.txt to test out the feature for movie-this and concert-this.
    
    // BONUS
        // Output any data to log.txt in addition to logging to terminal/bash. (use append)
    
    