var button = document.getElementById('button');

button.addEventListener('click', function(){
    tada();
})

function tada() {
    var person = prompt("Please enter your name");
    if (person != null) {
        document.getElementById("demo").innerHTML =
        "Hello " + person + "! How are you today?";
    }
}
