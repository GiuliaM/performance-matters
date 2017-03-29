/*   Modules    */
//takes the environment variables from the .env and loads it into process.env
//https://www.npmjs.com/package/dotenv
require('dotenv').config()
//gets the packages installed through npm
var https = require('https')
var express = require('express')
var app = express()
var concat = require('concat-stream') //adds all the data from a stream and calls callback with the result https://www.npmjs.com/package/concat-stream
var request = require('request')
//linking to the .env file to get the hidden key and url
var url = process.env.searchApi;
var posterUrl = 'http://image.tmdb.org/t/p/w500'
var detailUrl = 'https://api.themoviedb.org/3/movie/'
var apiKey = process.env.apiKey;

app.use(express.static('static'))


/*   View    */
app.set('view engine', 'ejs')
app.set('views', 'views')

/*   index    */
app.get('/movies', function (req, res) {
    console.log(url);
    request(url, function(error, response, body){
            var data = JSON.parse(body);

            res.render('index', {
                movies: data.results,
                url: posterUrl
             });
        });
});

//Zowel de tekst als poster worden niet goed geladen
app.get('/movies/:id', function (req, res) {
    request(detailUrl + req.params.id + apiKey, function(error, response, body){
            var data = JSON.parse(body);

            res.render('details.ejs', {
                        movie: data,
                        url: posterUrl
                     })
        });
});


app.listen(3000, function(){
    console.log('server is running on port 3000')
})


