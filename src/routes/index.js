var express = require('express');
var router = express.Router();
const Binance = require('binance-api-node').default;

// Authenticated client, can make signed calls
const client = Binance({
  apiKey: '1IZJSGFkFhSoChofgEjByvFNSYD45t0gNRTmcd8d9AGlSxDNKDYcUVCxvVSHdYf6',
  apiSecret: 'b9ZP9vXrrXvGaGEzCbFAUiaL3wYuUqXWJRlcjzeilv9KY4Vb14598qnOIvpJMeAc'
})

client.time().then(time => console.log(time))

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'HTML Igra'});
});

router.post('/webhook', async function(req, res, next) {

  //console.info( await binance.cancelAll("BTCUSDT") );

  let price;
  let response = await client.marginIsolatedAccount({ symbols: 'BTCUSDT'});
  price = response.assets[0].indexPrice;

  let quantityyy = 100 / price;
  
  if(req.body.content == 'buy'){

    quantityyy = 100 / price;
    console.log(await client.marginOrder({ 
      symbol: 'BTCUSDT', 
      isIsolated: 'TRUE',
      type: 'MARKET',
      side: 'BUY',
      quantity: quantityyy
    }));

  } else if(req.body.content == 'sell'){
    
    console.log(await client.marginOrder({ 
      symbol: 'BTCUSDT', 
      isIsolated: 'TRUE',
      type: 'MARKET',
      side: 'SELL',
      quantity: quantityyy
    }));

  }

});


module.exports = router;
