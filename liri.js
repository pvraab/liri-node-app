// Load the HTTP library
var http = require("http");

// Load the axios library
var axios = require("axios");

// Load the dotenv library
require("dotenv").config();

// Load Spotify node API
var Spotify = require('node-spotify-api');

// Load the Spotify keys
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

// Bands In Town function
var bandsInTown = function (artistName) {
    axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp")
        .then(function (response) {
            var jsonObj = response.data;
            jsonObj.forEach(function (elem, i) {
                console.log("Venue: " + elem.venue.name);
                console.log("Location: " + elem.venue.city + ", " + elem.venue.region + ", " + elem.venue.country);
                console.log("Date/Time: " + elem.datetime);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};

// Spotify function
var spotifyFunction = function (songName) {
    spotify.search({
        type: 'track',
        query: songName
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(JSON.stringify(data.tracks.items[0]));
        console.log("Artists: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("URL: " + data.tracks.items[0].album.external_urls.spotify);
        console.log("Album Name: " + data.tracks.items[0].album.name);

    });
};

// OmDbApi Movies function
var omDbApiFunction = function (movieName) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function (response) {
            console.log(response.data);
            console.log("Movie Title: " + movieName);
            console.log("Year: " + response.data.year);
            console.log("The movie's rating is: " + response.data.imdbRating);
            var isRotten = false;
            response.data.Ratings.forEach( function(elem, i) {
                if (elem.Source === "Rotten Tomatoes") {
                    console.log("Rotten Tomatoes rating is: " + elem.Value);
                    isRotten = true;
                }
            });
            if (!isRotten) {
                console.log("Rotten Tomatoes rating is: none");
            }
            console.log("Country movie produced in: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    );
};
omDbApiFunction("A Star is Born");