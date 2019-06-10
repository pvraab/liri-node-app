# liri-node-app

### Overview

In this assignment, I developed an app named LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

### Detailed Functionality

1. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.
2. A new GitHub repository called liri-node-app was created and cloned to my computer.
3. We retrieve the data that will power this app by requests using the `axios` package to the Bands in Town, Spotify and OMDB APIs. 
4. These Node packages  were crucial to this  assignment.
   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api) - Retrieve data about songs from Spotify.

   * [Axios](https://www.npmjs.com/package/axios)

     * This app uses Axios to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

   * [Moment](https://www.npmjs.com/package/moment) - Used to manipulate date/time data.

   * [DotEnv](https://www.npmjs.com/package/dotenv) - Used to mange environment data such as the Spotify keys in the .env file. 

## GitHub Repository

Created with and and used a standard GitHub repository at https://github.com/pvraab/liri-node-app. As this is a CLI App, it cannot be deployed to GitHub pages. As a result l have included screenshots incorporated into a [video](./LiriProject.mp4) showing the app working with no bugs. The information about the results of this app are discussed at the end of this document in the **Results** section.

### Commits

This project was committed at each stage of it's development. Meaningful comments were used to document the development steps.

### To Download and Run from Repository

1. cd working_directory

   ​	This will probably be done using a git bash shell terminal.

2. git clone https://github.com/pvraab/liri-node-app.git

   ​	Bring the code from the repository to your local working_directory.

3. npm install

   ​	Run npm install in the Liri directory to read the package.json and create a node_modules directory and populate it with all of the needed npm packages.

4. Run the various scripts into the liri app.

   ​	See the What Each **Command Should Do** section for detailed instructions.

### Development Steps

1. Create the GitHub repository with a README.md file and git clone that initial repository to the working directory. For example:

   - cd working_directory
   - git clone https://github.com/pvraab/liri-node-app.git

2. In the root of the local project run `npm init -y` &mdash; this will initialize a `package.json` file for the project. The `package.json` file is required for installing third party npm packages and saving their version numbers. Failure to initialize a `package.json` file will make it difficult  for anyone else to run the code after cloning the project since they will not know what packages are required.

3. Make a `.gitignore` file and add the following lines to it. This will tell git not to track these files, and thus they won't be committed to Github.

```
node_modules
.DS_Store
.env
```

3. Make a JavaScript file named `keys.js`.

* The keys.js file will manage the Spotify keys and looks like this:

```js
console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
```

4. Next, create a file named `.env`, add the following to it, replacing the values with valid API keys (no quotes) once you have them:

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

```

* This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github &mdash; keeping our API key information private.

* If someone wanted to clone the app from github and run it themselves, they would need to supply their own `.env` file for it to work.

5. Make a file called `random.txt`.

   * Inside of `random.txt` put the following in with no extra characters or white space:

     * spotify-this-song,"I Want it That Way"

6. Make a JavaScript file named `liri.js`.

7. At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package:

```js
require("dotenv").config();
```

8. Add the code required to import the `keys.js` file and store it in a variable.

```js
  var keys = require("./keys.js");
```

* We are then able to access the key information as

  ```js
  var spotify = new Spotify(keys.spotify);
  ```

9. Make it so liri.js can take in one of the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

### What Each Command Does

1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then the program will default to "The Sign" by Ace of Base.

   * Utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

   * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

   * Step One: Visit <https://developer.spotify.com/my-applications/#!/>

   * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

   * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

   * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

3. `node liri.js movie-this '<movie name here>'`

   1. This will output the following information to the terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   2. If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

     * It's on Netflix!

   3. You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
* Edit the text in random.txt to test out the feature for movie-this and concert-this.
  
5.  Output the data to a .txt file called `log.txt`. Append each command you run to the `log.txt` file. Do not overwrite your file each time you run a command. This log file is at [log.txt](./log.txt)

- - -

### Portfolio

Click on my Portfolio at my portfolio page at: <https://pvraab.github.io/RaabPortfolio/> to see the link to this app.

### Results

1. If you want to run this application, you will need to follow the instructions outlined in this document to git clone the app from GitHub, install the required NPM packages, and use the correct syntax to run the application in Node.js.
2. A video is included in the repository showing the application being run for each of the four endpoints. See this video at this [location](./LiriProject.mp4).
3. The concert-this function is shown [here](./images/image1.gif).
4. The spotify-this-song is shown [here](./images/image8.gif) and [here](./images/image9.gif).
5. The movie-this function is shown [here](./images/image13.gif).
6. The do-what-it-says function is shown [here](./images/image14.gif).
