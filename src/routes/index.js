var express = require('express');
var router = express.Router();
const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: '1IZJSGFkFhSoChofgEjByvFNSYD45t0gNRTmcd8d9AGlSxDNKDYcUVCxvVSHdYf6',
  APISECRET: 'b9ZP9vXrrXvGaGEzCbFAUiaL3wYuUqXWJRlcjzeilv9KY4Vb14598qnOIvpJMeAc'
});

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'HTML Igra'});
});

router.get('/webhook', async function(req, res, next) {
    console.info( await binance.futuresBalance() );

    res.redirect('/')
});


module.exports = router;
