### Moodvie: a overview of movies

This project is about displaying movies from the Movie Database API.

For starters I put the search query on John, only displaying the movies with the name John in the title.
By clicking on the movie you will get the details from this movie.

This whole project is build in server-side, with a few client-side javascripts. I'm going to bundle these client-side script with [Browserify](https://www.npmjs.com/package/browserify).


### Features
- View moviedetails

### Wishlist
- Add search query
- Show more movies (now 20)
- 404 handling

<img src="img/404h.png" alt="404 page" width="500px"/>

---

## Get started
First clone the repo:
```git
git clone https://github.com/GiuliaM/performance-matters.git
cd week2/tmdb-api
```

After that:

```git
npm install
```

In my .env file I put my api key and search query like this:
```javascript
apiKey=?api_key=[ACTUALKEY];
searchApi=https://api.themoviedb.org/3/search/movie[apiKey]&query=john;

```

Now start up the server:
```git
npm start
```

If you are using nodemon (so you don't have to restart the server after you changed a file), do this:
```git
nodemon app.js
```
or if you use node
```git
node app.js
```

## Audit
Before adding any client-side JavaScript I did two speed checks:

**Regular 2G (300ms, 250Kb/s, 50Kb/s)**<br>
**Status**<br>
Transferred: 1.4 MB<br>
Finish: 49.91 s<br>
DOMContentLoaded: 1.07 s<br>
Load: 49.92 s<br>

**Regular 4G (20ms, 4.0Mb/s, 3.0Mb/s)**<br>
**Status**<br>
Transferred: 1.4 MB<br>
Finish: 4.74 s<br>
DOMContentLoaded: 704 ms<br>
Load: 3.71 s<br>

<img src="img/nojs2g.png" alt="speed without client-side JavaScript 2G" height="300px">
<img src="img/nojs4g.png" alt="speed without client-side JavaScript 4G" height="300px">

I also did a check with [lighthouse](https://developers.google.com/web/tools/lighthouse/):
<img src="img/lhnojs.png" alt="Lighthouse test no javascript" height="300px">

---
I added the two client-side JavaScripts:

**Regular 2G (300ms, 250Kb/s, 50Kb/s)**<br>
**Status**<br>
Transferred: 1.4 MB<br>
Finish: 50.11 s<br>
DOMContentLoaded: 1.79 s<br>
Load: 50.12 s<br>

**Regular 4G (20ms, 4.0Mb/s, 3.0Mb/s)**<br>
**Status**<br>
Transferred: 1.4 MB<br>
Finish: 4.79 s<br>
DOMContentLoaded: 948 ms<br>
Load: 3.76 s<br>

<img src="img/2js2g.png" alt="speed with client-side JavaScript 2G" height="300px">
<img src="img/2js4g.png" alt="speed with client-side JavaScript 4G" height="300px">

I also checked [lighthouse](https://developers.google.com/web/tools/lighthouse/) again:
<img src="img/lh2js.png" alt="Lighthouse test two javascript" height="300px">
---
Then I bundled the client-side JavaScripts with Browserify stored in bundle.js

**Regular 2G (300ms, 250Kb/s, 50Kb/s)**<br>
**Status**<br>
Transferred: 1.4 MB<br>
Finish: 49.43 s<br>
DOMContentLoaded: 1.36 s<br>
Load: 49.43 s<br>

**Regular 4G (20ms, 4.0Mb/s, 3.0Mb/s)**<br>
**Status**<br>
Transferred: 1.4 MB<br>
Finish: 5.11 s<br>
DOMContentLoaded: 879 ms<br>
Load: 4.07 s<br>

<img src="img/bundle2g.png" alt="speed with bundled client-side JavaScript 2G" height="300px">
<img src="img/bundle4g.png" alt="speed with bundled client-side JavaScript 4G" height="300px">

I also checked [lighthouse](https://developers.google.com/web/tools/lighthouse/) again:
<img src="img/lhbundle.png" alt="Lighthouse test bundled javascript" height="300px">
---
