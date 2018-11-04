# LIRI-Bot

This is a simple Command Line Interface (CLI) app that uses NodeJS and the NPM Inquirer Package to provide the user with four different options:
* Use the Spotify API to look up song information. (spotify-this-song)
* Use the Bands in Town API to look up concert information. (concert-this)
* Use the OMDB API to look up movie information. (movie-this)
* Read the file random.txt and display a list of different options for the user to choose from.

## Motivation

I wanted to create a CLI application that could allow for a user to get very specific information quickly and easily, and to do so in a way that would closer emulate server-side environments.

## Screenshots and Other Media

### First list options for Liri-bot
![Liri-bot: Options](https://camo.githubusercontent.com/45d6a8b1fa634d8e843ce5e0d42819aa3e6a7ab1/68747470733a2f2f696d616765732e7a656e68756275736572636f6e74656e742e636f6d2f3562623434323864353864336239326466656466333038342f63333465633930342d613162302d346138352d393935372d323263653965396666376132)

### do-what-it-says list options
![Liri-bot: do-what-is-says option](https://camo.githubusercontent.com/1672e988d4b8ca06503cfb387bcba5e0c068bbcb/68747470733a2f2f696d616765732e7a656e68756275736572636f6e74656e742e636f6d2f3562623434323864353864336239326466656466333038342f37303463303339312d373432302d343133302d613730392d343838636334316535356663)

### Display information from (user's choice) do-what-it-says list.
![Liri-bot: do-what-it-says, displaying user's choice](https://camo.githubusercontent.com/69d416973b063b2122f083ae33c6671a84c50af4/68747470733a2f2f696d616765732e7a656e68756275736572636f6e74656e742e636f6d2f3562623434323864353864336239326466656466333038342f64653735653364352d613031322d343332332d623238352d333830393138633965653639)

### concert-this functionality
![Liri-bot: concert-this, displaying user input prompt](https://camo.githubusercontent.com/877ba6b89549931f7ded8cf37116aa5bbbe08861/68747470733a2f2f696d616765732e7a656e68756275736572636f6e74656e742e636f6d2f3562623434323864353864336239326466656466333038342f65373434636630342d373935332d346161322d613466342d656263363664646633336463)
![Liri-bot: concert-this, displaying information from Bands in Town API](https://camo.githubusercontent.com/571dd4c950d8eb0c386819832f2338d9fcb3c28d/68747470733a2f2f696d616765732e7a656e68756275736572636f6e74656e742e636f6d2f3562623434323864353864336239326466656466333038342f64313430613038642d336661342d343531302d396632662d306164343633313933313735)

### spotify-this-song functionality
![Liri-bot: spotify-this-song, displaying user input and information obtained from spotify API](https://camo.githubusercontent.com/dfcb72e84c9d7b0690685299e06b9b72d4d6e5b8/68747470733a2f2f696d616765732e7a656e68756275736572636f6e74656e742e636f6d2f3562623434323864353864336239326466656466333038342f63613436333462612d303038662d343663372d383964662d346462373832343737396263)

### movie-this functionality
![Liri-bot: movie-this, displaying user input and information from OMDB API](https://camo.githubusercontent.com/de2b25ddbbc42b23ce7db7a7bd4ee40746bf26d6/68747470733a2f2f696d616765732e7a656e68756275736572636f6e74656e742e636f6d2f3562623434323864353864336239326466656466333038342f62356265366264352d386231312d346562632d383435642d613261383138623361303466)

## Technologies Used

* JavaScript
* NodeJS

## Installation and Execution

* Clone the repository to your local computer
* Run: NPM install
* Run: Node liri.js

## Code Examples - (for move-this functionality)

```
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
```