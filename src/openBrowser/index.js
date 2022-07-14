const express = require('express')
const browser = express.Router()
const open = require('open')

browser.get('/',async (req, res) => {   
    open('https://blog.csdn.net/qq_19309473/article/details/123932103', 'Microsoft Edge');
    res.send()
})
module.exports = browser
