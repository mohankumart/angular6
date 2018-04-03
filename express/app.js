const express = require('express')

var app = express()

app.get('/', (req, res)=>{
    res.send('Hello Mohan!!!!')
})

app.listen(3001, ()=>{
    console.log('server started on 3001')
})