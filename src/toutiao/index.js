const express = require('express')
const axios = require('axios')
const toutiao = express.Router()
const {sign} = require('./toutiao')
const request = require('request')
function requestApi(token, _signature, max_behot_time){
    return new Promise(async (resolve, reject) => {
        const headers = {
            'authority': 'www.toutiao.com',
            'pragma': 'no-cache',
            'cache-control': 'no-cache',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-dest': 'document',
            'accept-language': 'zh-CN,zh;q=0.9',
        }
        const params = {
            category:'pc_profile_article',
            token,
            max_behot_time,
            aid: 24,
            app_name: "toutiao_web",
            _signature
        }
        try{
            const res = axios.get('https://www.toutiao.com/api/pc/list/user/feed',headers, params)
            console.log('res', res);
            resolve(res)
        }catch(err){
            console.log('err--', err);
            reject(err)
        }

    })
}

toutiao.get('/',async (req, res) => {
    const _signature = sign({url: 'https://www.toutiao.com/c/user/token/MS4wLjABAAAAaezOXkHVr0_i2JvWXprb4zLGpRInnKStptFm5WsXHKU/?source=feed&log_from=c17806df6bed3_1659664244685&tab=article&wid=1659681529034'})
    console.log('_signature', _signature);
    const token = 'MS4wLjABAAAAaezOXkHVr0_i2JvWXprb4zLGpRInnKStptFm5WsXHKU'
    const t = await requestApi(token, _signature, '')
    res.send(t)
})
module.exports = toutiao