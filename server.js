const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();

    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('scremIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome To home page',
    });  
});

app.get('/about', (req, res) => {
   res.render('about.hbs', {
       pageTitle: 'About page',
   });
});

app.get('/project', (req,res) => {
    res.render('project.hbs');
});

//bad
app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to find bad'
    });
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});