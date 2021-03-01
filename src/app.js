const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
 
// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// setup directory to the path
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=> {
    res.render('index', {
        name:'Arjun',
        title:'Weather App'
    })
})

app.get('/About', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Arjun'
    })
})

app.get('/Help', (req,res) => {
    res.render('help', {
        title: 'Help'
    })
})

// router of weather with return JSON data
app.get('/Weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, (error,{ lat,lon,location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(lat,lon,(error,forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,location,
                address: req.query.address
            })
        })
        
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    else{
        console.log(req.query)
        res.send({
            products: [],
            name: 'arjun'
        })
    }
    
})

// set the server at 3000 port 
app.listen(3000, () => {
    console.log('server is up on port 3000')
})

