const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(`${__dirname}/views/partials`)


// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', {navbar: true});
});

app.get('/beers', (req, res) => {
punkAPI
  .getBeers() 
  .then(beersList => {
    res.render('beers', {beersList})
  }) 
  .catch(error => console.log(error));
})
 
app.get('/beers/beer:id', (req, res) => {
  punkAPI
  .getBeer(req.params.id)
  .then(beerId => {
    res.render('beer', {
      beer: beerId
    })
  })
})

app.get('/random-beer', (req, res) => {
punkAPI
  .getRandom()
  .then(responseFromAPI => {
    res.render('random-beer', {responseFromAPI})
  })
  .catch(error => console.log(error));
})

app.get('*', (req, res) => {
  res.render('server-error');
});

app.listen(3000, (err) => {
  if (err) {
    return console.error(err)
  }
console.log('🏃‍ on port 3000');
})
