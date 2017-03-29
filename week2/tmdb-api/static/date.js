var name = require('./name.js')

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;//January is 0!
var yyyy = today.getFullYear();

if(dd<10)
{
    dd='0'+dd;
}

if(mm<10)
{
    mm='0'+mm;
}
today = dd+'-'+mm+'-'+yyyy;
console.log(today);

document.getElementById('date').innerHTML= today;

//http://www.w3resource.com/javascript-exercises/javascript-basic-exercise-3.php

module.exports
