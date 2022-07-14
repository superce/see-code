const express = require('express')
const tesseract = require('node-tesseract-ocr')
const code = express.Router()

function getImg(){
    return new Promise((resolve, reject) => {
        const path = __dirname + '\\4.jpg'
        console.log(path);
        const config = {
            lang: "eng",
            oem: 1,
            psm: 6,
          }
        tesseract.recognize(path).then((text) => {
          console.log("Result:", text)
          resolve(text)
        }).catch((error) => {
            reject(error)
          console.log(error.message)
        })
    })
}

code.get('/code', async (req, res) => {
    const t = await getImg()
    res.send(t)
})
module.exports = code