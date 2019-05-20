// Write code here to parse command line arguments and store them into variables
// According to the opCode call the appropriate Liri functions.
var fs = require("fs");

var Liri = require("./liriEngine");

// Create a new Liri object
var liri = new Liri();

// Grab opCode command line argument
var opCode = process.argv[2];

// Joining the remaining arguments since a selection name may contain spaces
var term = process.argv.slice(3).join(" ");

// By default, if no search type is provided, 
if (!opCode) {
    console.log("No operation selected");
}

// Run a Liri function based on opCode
if (opCode === "concert-this") {
    if (!term) {
        term = "Neil Young";
    }
    liri.bandsInTownFunction(term);
} else if (opCode === "spotify-this-song") {
    if (!term) {
        term = "The Sign";
    }
    liri.spotifyFunction(term);
} else if (opCode === "movie-this") {
    if (!term) {
        term = "Mr. Nobody";
    }
    liri.omDbApiFunction(term);
} else if (opCode === "do-what-it-says") {
    fs.readFile("random.txt", 'utf8', function (err, data) {
        var inData = data.split(",");
        opCode = inData[0].trim();
        term = inData[1].trim();
        if (opCode === "concert-this") {
            if (!term) {
                term = "Neil Young";
            }
            liri.bandsInTownFunction(term);
        } else if (opCode === "spotify-this-song") {
            if (!term) {
                term = "The Sign";
            }
            liri.spotifyFunction(term);
        } else if (opCode === "movie-this") {
            if (!term) {
                term = "Mr. Nobody";
            }
            liri.omDbApiFunction(term);
        }

    });
}