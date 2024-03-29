const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');

const forecast = require ('./utils/forecast');
const geoCode = require ('./utils/geoCode');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);


// Setups static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name:'Kevin'
    });
});

app.get('/about', (req , res) => {
    res.render('about' , {
        title:'About me',
        name:' Kevin'
    });
});

app.get('/help', (req , res) =>{
    res.render('help',{
        message:'This page is here to help',
        title: 'Help',
        name: 'kevin'
    });
});


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"You must enter and address"
        });
    };

    geoCode(req.query.address,  (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error});
        }

        forecast(latitude, longitude, (error,forecastData) => {
            if(error){
                return res.send({error});
            }

            res.send({
                forecast:forecastData,
                location,
                addres:req.query.address
            })
        });
    });



    
    

    
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        });
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage:'Help article not found',
        title: '404',
        name: 'kevin'

    });
    // res.send('Help article not found');
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage:"couldn't find the page",
        title: '404',
        name: 'kevin'
    });
});

app.listen(port, () => {
    console.log('Server is up on port' + port +'.');
});