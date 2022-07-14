const express = require('express')
const request = require('request')
const wyc = express.Router()

function requestApi(){
    return new Promise((resolve, reject) => {
        request({
            url: 'http://www.wzwyc.com/api.php',
            method: "POST",
            json: true,
            headers: {
              "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            form: {
              info: '床前明月光，疑是地上霜'
            }
          }, function (error, response, body) {
            console.log('error', error, 'response', response, 'body', body);
            if (!error && response.statusCode == 200) {
              console.log(body) // 请求成功的处理逻辑
              resolve(body)
            }
          }); 
    })
}
wyc.get('/',async (req, res) => {
    const t = await requestApi()
    res.send(t)
})
module.exports = wyc