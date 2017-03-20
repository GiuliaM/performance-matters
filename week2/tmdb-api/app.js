/*   Modules    */
//gets the packages installed through npm
var https = require('https')
var express = require('express')
var app = express()
var concat = require('concat-stream') //adds all the data from a stream and calls callback with the result https://www.npmjs.com/package/concat-stream



//linking to the .env file to get the hidden key and url
var url = process.env.searchApi;
var apiKey = process.env.apiKey;

//takes the environment variables from the .env and loads it into process.env
//https://www.npmjs.com/package/dotenv
require('dotenv').config()


//movieRouter = require('./routes/movies');

/*   View    */
app.set('view engine', 'ejs')

/*   index    */
app.get('/search/:query?', function (req, res) {
//    var query = req.params.query;
//
//    function callback{
        res.render('index')
//    }
})


var data = require("./results.js")
console.log(data)
/*   Npm server    */
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
