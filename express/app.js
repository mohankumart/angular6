const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const port = process.env.PORT || 3000

var app = express()

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs')


app.use((req, res, next)=>{
    var now = new Date().toString()
    var log =`${now} : ${req.method} ${req.httpVersionMajor}` 
    console.log(log)

    fs.appendFile('server.log', log+'\n', (err)=>{
        if(err){
            console.log('unable to append to server')
        }
    })
    next()
})

app.use(express.static(__dirname+'/public'))

app.use((req, res, next)=>{
    res.render('matainance.hbs')
})

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
})

app.get('/', (req, res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcome: 'Welcome Mohan!!!!!!'
    })
})

app.get('/about', (req, res) =>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    })
})

app.listen(port, ()=>{
    console.log(`server started on ${port}`)
})