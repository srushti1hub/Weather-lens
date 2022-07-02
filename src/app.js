// Web Application
const express = require('express')
const request = require('request')
const path = require('path')
const hbs = require('hbs')
const { response } = require('express')

const app = express()
const port = process.env.PORT || 8000 

const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../views')

app.use(express.static(publicPath))
app.set('view engine', 'hbs')
app.set('views',viewsPath)

app.get('',(req,res) => {
    res.render('index',{})
})

app.get('*',(req,res) => {
    res.send('ERROR 404')
})

app.listen(port,() => {
    console.log('Server started on port '+port)
})