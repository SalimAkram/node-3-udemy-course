const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath =  path.join(__dirname, '../templates/partials')

//Setup for handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup staticu for static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Salim Akram'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Salim Akram'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    message: 'This is a list of all the frequently asked questions!',
    name: 'Salim Akram'
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address

  if(!address) {
    return res.send({
      error: 'You must provide an address!!'
    })
  } else {
    geocode(address, (error, {latitude, longitude, location} = {}) => {
      if (error) {
        return res.send({ error })
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        }
        res.send({
          location: location,
          forecast: forecastData,
          address: address
        })
      })
    })
  }
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term!'
    })
  }
  
  console.log(req.query.search)

  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Salim Akram',
    message: 'Help article not found!'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Salim Akram',
    message: 'Page Not Found!'
  })
})

app.listen(3000, () => {
  console.log('server is launched kyehd!');
})