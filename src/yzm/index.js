const express = require('express')
const request = require('request')
const axios = require('axios') ;
const yzm = express.Router()


function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
}
  
// 喜马拉雅
function requestApi(nonce){    
    const param = JSON.stringify({mobile:"15532963398",nonce,"sendType":1,"signature": "c377d510c88702bc4b6b774b2d5cad9dc5ed0057"})
    console.log(param);
    return new Promise(async (resolve, reject) => {
        request({
            url: 'https://passport.ximalaya.com/web/sms/send',
            method: "POST",
            json: true,
            headers: {
                'Content-Type':'application/json'
            },
            body: param
          }, function (error, response, body) {
            // console.log('error', error, 'response', response, 'body', body);
            if (!error && response.statusCode == 200) {
              console.log('发送',body) // 请求成功的处理逻辑
              resolve(body)
            }
          }); 
        // const { data } = await axios.post('https://passport.ximalaya.com/web/sms/send', {
        //   headers:{"content-type": "application/json"},
        //   data:{mobile:"15532963398",nonce,"sendType":1,"signature": "c377d510c88702bc4b6b774b2d5cad9dc5ed0057"},
        //   responseType: 'json'
        // })
        // console.log(data);
        // axios({
        //     url: 'https://passport.ximalaya.com/web/sms/send',
        //     method: "POST",
        //     json: true,
        //     headers:{"content-type": "application/json"},

        // })
        // resolve(data)
    })
}
function api1(){
    const timestr = new Date().getTime()
    const url = 'https://passport.ximalaya.com/web/nonce/' + timestr
    return new Promise((resolve, reject) => {
        request({ url, method: "GET", json: true }, function (error, response, body) {
            // console.log('error', error, 'response', response, 'body', body);
            if (!error && response.statusCode == 200) {
              console.log('获取',body) // 请求成功的处理逻辑
              resolve(body)
            }
          }); 
    })
}
function waittime(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1000);
    })
}
const ximanonce = async () => {
    const { nonce } = await api1()
    // console.log()
    await waittime()
    const result = await requestApi(nonce)
}
yzm.get('/', async (req, res) => {
    await ximanonce()
    res.send()
})
module.exports = yzm