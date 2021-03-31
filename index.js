const axios = require('axios');
const smsClient = require("./smsClient");
const cheerio = require('cheerio');
const url = 'https://www.beerhawk.co.uk/perfectdraft-tennent-s-lager-6l-keg';

async function checkResponse(url) {
    try {
        var response = await axios(url);

        const html = response.data;

        const $ = cheerio.load(html);
        const available = $("#product_addtocart_form > div.box-tocart > div > div.stock.available > span");
        return available.text();
    } catch (e) {
        throw e;
    }
}

async function sendMessageWhenInStock(url) {
    try {
        console.log('setting interval check ' + 60 * 1000 + 'ms');
        const interval = setInterval(async () => {
            var stock = await checkResponse(url)
            console.log(stock)
            if (stock === "In stock") {
                console.log('BIG JUICYS IN STOCK SENDING MESSAGE')
                smsClient.sendMessage(url)
                clearInterval(interval);
            } else {
                console.log('NO BIG JUICYS: ' + new Date().toTimeString());
            }
        }, 60 * 1000);
    } catch (e) {
        throw e;
    }

}

try {
    console.log('RUNNING BIG JUICY STOCK CHECKER')
    sendMessageWhenInStock(url);
} catch(e) {
    console.error(e);
    sendMessageWhenInStock(url);
}
