// Load the HTTP library
var http = require("http");

// Load the axios library
var axios = require("axios");

// Load the dotenv library
require("dotenv").config();

// Load Spotify node API
var Spotify = require('node-spotify-api');

// Load the FileSystem library
var fs = require("fs");

// Load the Spotify keys
var keys = require("./keys.js");

// Load the moment library
var moment = require("moment");

var spotify = new Spotify(keys.spotify);

var Liri = function () {

    // Bands In Town function
    this.bandsInTownFunction = function (artistName) {
        axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp")
            .then(function (response) {
                var jsonObj = response.data;
                jsonObj.forEach(function (elem, i) {
                    if (i === 0) {
                        console.log("\n");
                        console.log("concert-this " + artistName);
                        fs.appendFile("log.txt", "concert-this " + artistName + "\n", function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });    
                    }

                    // Convert date using moment
                    var dateArr = elem.datetime.split("T");
                    var newDate = moment(dateArr[0],'YYYY-MM-DD');

                    // Create output string
                    var outStr = "Venue: " + elem.venue.name + "\n" +
                        "Location: " + elem.venue.city + ", " + elem.venue.region + ", " + elem.venue.country + "\n" +
                        "Date: " + moment(newDate).format("MM/DD/YYYY") + "\n" +
                        "==========================================================";
                    console.log(outStr);
                    fs.appendFile("log.txt", outStr + "\n", function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // Spotify function
    this.spotifyFunction = function (songName) {
        spotify.search({
            type: 'track',
            query: songName
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            for (var i = 0; i < data.tracks.items.length; i++) {
                if (i === 0) {
                    console.log("\n");
                    console.log("spotify-this-song " + songName);
                    fs.appendFile("log.txt", "spotify-this-song " + songName + "\n", function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                var outStr = "Artists: " + data.tracks.items[i].artists[0].name + "\n" +
                    "Song Name: " + data.tracks.items[i].name + "\n" +
                    "URL: " + data.tracks.items[i].album.external_urls.spotify + "\n" +
                    "Album Name: " + data.tracks.items[i].album.name + "\n" +
                    "==========================================================";
                console.log(outStr);
                fs.appendFile("log.txt", outStr + "\n", function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
    };

    // OmDbApi Movies function
    this.omDbApiFunction = function (movieName) {
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        axios.get(queryUrl).then(
            function (response) {
                var isRotten = false;
                var rottenStr = "";
                response.data.Ratings.forEach(function (elem, i) {
                    if (elem.Source === "Rotten Tomatoes") {
                        rottenStr = "Rotten Tomatoes rating is: " + elem.Value + "\n";
                        isRotten = true;
                    }
                });
                if (!isRotten) {
                    rottenStr = "Rotten Tomatoes rating is: none\n";
                }
                console.log("\n");
                console.log("movie-this " + movieName);
                fs.appendFile("log.txt", "movie-this " + movieName + "\n", function (err) {
                    if (err) {
                        console.log(err);
                    }
                });

                var outStr = "Movie Title: " + movieName + "\n" +
                    "Year: " + response.data.year + "\n" +
                    "IMDB movie's rating is: " + response.data.imdbRating + "\n" +
                    rottenStr +
                    "Country movie produced in: " + response.data.Country + "\n" +
                    "Language: " + response.data.Language + "\n" +
                    "Plot: " + response.data.Plot + "\n" +
                    "Actors: " + response.data.Actors + "\n" +
                    "==========================================================";
                console.log(outStr);
                fs.appendFile("log.txt", outStr + "\n", function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        );
    };

};


// Exporting the Liri constructor which we will use in liri.js
module.exports = Liri;