const path = require('path')
const express = require('express')
const request = require('request')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Swati Mukherjee'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'About me',
        name: 'Swati Mukherjee'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help page',
        name: 'Swati Mukherjee',
        helpMessage:'This is the help page'
    })
})

app.get('/router', (req, res) => {
res.send('<h1>In router page</h1>')
})


app.get('/weather', (req, res) =>{

    if(!req.query.address)
        return res.send({
            error: 'Please provide an address in the query'
        })

geocode(req.query.address , (error, {location} = {})=>{
        if(error)
        {
            return res.send({error}) 
        }
        forecast(req.query.address, 23, (error,forecastdata)=>{
            if(error){
                return res.send({error}) 
            }
            res.send({
                forecast: forecastdata,
                location: location,
                address: req.query.address
            })
            
        })

})


})


app.get('/products' , (req, res) =>{
    if(!req.query.search)
    return res.send({
        error: 'Please send a search term in the query'
    })

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: 'Help page',
        name: 'Swati Mukherjee',
        errorMsg:'Help article not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Swati Mukherjee',
        errorMsg:'Page not found'
    })
})



app.listen(port, () => {
    console.log('Server is up and running on port ' +port)
})
