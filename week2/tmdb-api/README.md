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

<img src="img/404h.png" alt="404 page"/>

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

#### Regular 2G (300ms, 250Kb/s, 50Kb/s)
*Status*
Transferred: 1.4 MB
Finish: 49.91 s
DOMContentLoaded: 1.07 s
Load: 49.92 s

#### Regular 4G (20ms, 4.0Mb/s, 3.0Mb/s)
*Status*
Transferred: 1.4 MB
Finish: 4.74 s
DOMContentLoaded: 704 ms
Load: 3.71 s

<img src="img/nojs2g.png" alt="speed without client-side JavaScript 2G" height="300px">
<img src="img/nojs2g.png" alt="speed without client-side JavaScript 2G" height="300px">

I added the two client-side JavaScripts
<img src="img/dateNameJsAdded.png" alt="speed with client-side JavaScript" height="400px">

Then I bundled the client-side JavaScripts with Browserify stored in bundle.js
<img src="img/bundleJS.png" alt="speed with client-side JavaScript" height="300px">
