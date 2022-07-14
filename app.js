const express = require("express")
const app = express()
// const request = require('request')
const fs = require('fs')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

const code = require('./src/index')
app.use('/', code)

const wyc = require('./src/wyc/index')
app.use('/wyc', wyc)

const bro = require('./src/openBrowser/index')
app.use('/browser', bro)

const yzm = require('./src/yzm/index')
app.use('/yzm', yzm)
const server = app.listen(3300, () => {
    const host = server.address().address
    const port = server.address().port
    console.log(host);
    console.log('example app listenting at http://localhost:' + port);
})