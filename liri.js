require("dotenv").config();

var keys = require("./keys.js");
var request = require('request');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var inquirer = require('inquirer');
var fs = require("fs");

var cmd = ""; // Variable for switch statement, to determine function that the user wants to use.
var userArg = ""; // Variable for user input from inquirer.

// var cmd = process.argv[2]; // Commented-out to add Inquirer package functionality.
// var userArg = process.argv[3]; // Commented-out to add Inquirer package functionality.
// var artist = process.argv[3]; // Commented-out to add Inquirer package functionality.

// console.log(queryURL);

// function that uses inquirer - List - To have the user choose between 1 of 4 options: concert-this, spotify-this-song, movie-this, and do-what-it-says.
function makeAChoice() {
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
    } /// makeAChoice();
    

// function to run inquirer to ask the user to input an artist(s) to look-up.
function iqConcertThis() {
    // Using inquirer, ask for the user to input an artist(s) name, assign that input to the variable userArg, and call the concertThis(); function.
    // IF, userArg === "". THEN, call inquirer methods. ELSE, call concertThis(); function.
    if (userArg === "") {
        inquirer
        .prompt([
            {
            type: 'input',
            name: 'userArg',
            message: 'Please provide Liri-bot with the artist(s) you would like to look-up: '
            }
        ])
        .then(answers => {
            userArg = answers.userArg;
            concertThis();
        });
    } else {
        concertThis();
    }
} /// iqConcertThis();

// node liri.js concert-this <"name of artist">
// function to query the bandsintown API and display pertinent information.
function concertThis() {    
    // Use request package to query bandsintown API.
    var queryURL = "https://rest.bandsintown.com/artists/" + userArg + "/events?app_id=codingbootcamp"

    request(queryURL, function(err, res, body) {
        // If the request was successful...
      if (!err && res.statusCode === 200) {
    
        // Then log the body from the site!
        // console.log(body);
    
        var obj = JSON.parse(body);
    
        // console.log(obj[0].venue.name);
            console.log(" ");
            console.log("Here are some upcoming events involving: " + userArg)
            console.log("--------------------------------------------------");

            // log.txt ////////////////////
            var text = "\nHere are some upcoming events involving: " + userArg + "\n--------------------------------------------------"
            fs.appendFile("log.txt", text, function(err) {
                if (err) {
                    console.log(err);
                }
            });
    
            for (let i = 0; i < obj.length; i++) {
    
                // use moment.js to change the event date format to MM/DD/YYYY
                var showDate = moment(obj[i].datetime).format('L');
    
                console.log(" ");
                console.log("Venue: " + obj[i].venue.name);
                console.log("Location: " + obj[i].venue.city + " " + obj[i].venue.region);
                console.log("Date: " + showDate);
                console.log("-----------------------");

                // log.txt ////////////////////
                var text = "\nVenue: " + obj[i].venue.name + "\nLocation: " + obj[i].venue.city + " " + obj[i].venue.region + "\nDate: " + showDate + "\n-----------------------"
                fs.appendFile("log.txt", text, function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }  
    });
} /// concertThis();

// function to run inquirer to ask the user to input a song title to look-up.
function iqSpotifyThisSong() {
    // Using inquirer, ask for the user to input a song title, assign that input to the variable userArg, and call the spotifyThisSong(); function.
    // IF, userArg === "". THEN, call inquirer methods. ELSE, call spotifyThisSong(); function.
    if (userArg === "") {
        inquirer
        .prompt([
            {
            type: 'input',
            name: 'userArg',
            message: 'Please provide Liri-bot with the song that you would like to look-up: '
            }
        ])
        .then(answers => {
            userArg = answers.userArg;
            spotifyThisSong();
        });
    } else {
        spotifyThisSong();
    }
} /// iqSpotifyThisSong();

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

            // log.txt ////////////////////
            var text = "\nSpotify-ing the song: " + songTitle + "\n--------------------------------------------------\nArtist(s): " + artistInfo[0].name + "\nSong Title: " + songTitle + "\nClick link to listen! " + extLink + "\nAlbum name: " + albumName + "\n--------------------------------------------------";
            fs.appendFile("log.txt", text, function(err) {
                if (err) {
                    console.log(err);
                }
            });

        });


} /// spotifyThisSong();

// function to run inquirer to ask the user to input a movie title to look-up.
function iqMovieThis() {
    // Using inquirer, ask the user to input a movie title, assign that input to the variable userArg, and call the movieThis(); function.
    // IF, userArg === "". THEN, call inquirer methods. ELSE, call movieThis(); function.
    if (userArg === "") {
        inquirer
        .prompt([
            {
            type: 'input',
            name: 'userArg',
            message: 'Please provide Liri-bot with the movie that you would like to look-up: '
            }
        ])
        .then(answers => {
            userArg = answers.userArg;
            movieThis();
        });
    } else {
        movieThis();
    }
} /// iqMovieThis();

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

        // log.txt ////////////////////
        var text = "\nBelow is information about the movie: " + obj.Title + "\n-----------------------\nTitle: " + obj.Title + "\nYear of Release: " + obj.Year;
        fs.appendFile("log.txt", text, function(err) {
            if (err) {
                console.log(err);
            }
        });

        for (let i = 0; i < obj.Ratings.length; i++) {
            console.log(obj.Ratings[i].Source + ": " + obj.Ratings[i].Value);
        }

        console.log("Country of Origin: " + obj.Country);
        console.log("Language: " + obj.Language);
        console.log("-----------------------");
        console.log("Plot Summary: " + obj.Plot);
        console.log("Actors: " + obj.Actors);
        console.log("-----------------------");

        // log.txt ////////////////////
        var text = "\nCountry of Origin: " + obj.Country + "\nLanguage: " + obj.Language + "\n-----------------------\nPlot Summary: " + obj.Plot + "\nActors: " + obj.Actors + "\n-----------------------";
        fs.appendFile("log.txt", text, function(err) {
            if (err) {
                console.log(err);
            }
        });

        }  
    });
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

        // Use inquirer - list - To have the user choose from the different options provided in random.txt
        inquirer
            .prompt([
                {
                type: 'list',
                name: 'userChoice',
                message: 'Please choose from this list what you would like Liri-bot to accomplish: ',
                choices: randomArr
                }
            ])
            .then(answers => {
                var userChoice = answers.userChoice;
                var userChoiceArr = userChoice.split(":");
                cmd = userChoiceArr[0];
                userArg = userChoiceArr[1];
                cmdSwitch();
            });
      
    });
} /// doWhatItSays();

// function to run the switch statment and call the other functions depending on the variable cmd.
function cmdSwitch() {
    switch(cmd) {
        case "concert-this":
            iqConcertThis();
            break;
        case "spotify-this-song":
            iqSpotifyThisSong();
            break;
        case "movie-this":
            iqMovieThis();
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
    }
} /// cmdSwitch();

// cmdSwitch(); // Commented-out to add Inquirer package functionality.

//// Function call to start liri-bot ////
makeAChoice(); //////////////////////////
/////////////////////////////////////////

