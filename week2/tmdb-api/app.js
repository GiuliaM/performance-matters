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
var apiKey = process.env.apiKey;

app.use(express.static('static'))


/*   View    */
app.set('view engine', 'ejs')
app.set('views', 'views')

/*   index    */
app.get('/', function (req, res) {
    console.log(url);
    request(url, function(error, response, body){
            console.log(error);
            console.log(response);

            var data = JSON.parse(body);

            res.render('index.ejs', {
                        movies: data.results,
                        url: posterUrl
                     })
        });
});


app.listen(3000, function(){
    console.log('server is running on port 3000')
})
