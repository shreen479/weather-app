
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000 // process.env.PORT will be set port value in heroku

//Paths required for express config
const publicDIrPath = path.join(__dirname, '../public')
// path of templates if thoseare  defined in customized path instead of default 'views' folder
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath) // setting views path as  templates folder path 
hbs.registerPartials(partialsPath)

app.use(express.static(publicDIrPath)) // This displays index html at homepage : url locahost:3000

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shrini'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'Weather App About',
        name: 'Shrini'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Weather App Help',
        name: 'Shrini'
    })
})

app.get('/help/*', (req,res) => {
    res.render('errorPage', {
        title: 'Weather App',
        name: 'Shrini',
        errorMsg: 'Help article not found ..!'
    })
})

app.get('/weather', (req,res) => {
    //console.log(req)
    if(!req.query.address) {
        return res.send({error: 'Address not provided..!'})
    }

    // res.send({
    //     Location: req.query.address,
    //     Forecast: "Its raining..! Temp : 16"
    // })

    const address = req.query.address
    //console.log('address :' + address)
    geocode(address, (error, geoData) => {
        if(error) {
            return res.send({error:error})
        }

        forecast(geoData.latitude, geoData.longitude, (error, forecastData) => {
            if(error){
                return res.send({error: error})
            }

           
            res.send({
                address: address,
                location: geoData.location,
                temperature: forecastData.temperature,
                precipProbability: forecastData.precipProbability
            })
        })
    })
})

app.get('*', (req,res) => {
    res.render('errorPage', {
        title: 'Weather App',
        name: 'Shrini',
        errorMsg: 'Page not found..!'
    })
})

// Below code never gets called if app.use(express.static(...)) is called
// app.get('', (req, res) => {  // url to access : localhost:3000
//     res.send( '<h1> Hello Express..! Main page..! </h1>')
// })

app.listen(port, () => {
    console.log(' Express server started with port' + port)
})