//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const seedData = require('./models/seedData.js')
const Drink = require('./models/schema.js')
const db = mongoose.connection;
require('dotenv').config()


//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , ()=> { 
    console.log('connected to mongo')
}
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes

///Edit
app.get('drinks/:id/edit', (req,res) => {
  Drink.findById(req.params.id, (err,data) => {
    res.render('edit.ejs', {
      drinks: data
    })
  })
})


app.put('/:id', (req,res) => {
  Drink.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedDrink) => {
    res.redirect('/')
  })
})
//Index
app.get('/drinks', (req, res)=>{
  Drink.find({}, (error, allDrinks)=>{
      res.render('index.ejs', {
          drinks: allDrinks
      });
  });
});

//New
app.get('/drinks/new', (req,res) => {
  res.render('new.ejs')
})

//create
app.post('/drinks/', (req,res) => {
  Drink.create(req.body, (err, createdDrink) => {
    res.redirect('/drinks')
  })
})

//delete
app.delete('/drinks/:id', (req, res)=>{
  Drink.findByIdAndRemove(req.params.id, (err, data)=>{
      res.redirect('/drinks');
  });
});

app.get('/seed', (req,res) => {
  Drink.create(seedData, (err,seedData) => {
    res.redirect('/drinks')
  })
})

app.post('/', (req,res) => {
  Drink.create(req.body, (err, createdDrink) => {
    res.redirect('/drinks')
  })
})


app.get('/drinks/:id', (req,res) => {
  Drink.findById(req.params.id, (err,foundDrink) => {
    res.render('show.ejs', {
      drink:foundDrink
    })
  })
})
app.use('/', (req,res) => {
  Drink.find({}, (err, allDrink) => {
    res.render('index.ejs', {
      drinks: allDrink
    })
  })
})



//___________________
//localhost:3000


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));