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

router.post('/webhook', async function(req, res, next) {
    /* console.info( await binance.futuresBalance() );
    console.info( await binance.futuresMarkPrice( "BTCUSDT" ) );
    */

    //console.info( await binance.futuresOpenOrders( "BTCUSDT" ) );
    console.info( await binance.futuresCancelAll( "BTCUSDT" ) );
    let result = await binance.futuresMarkPrice( "BTCUSDT" );
    let quantity = (1000 / result.markPrice).toFixed(3)
    /* let balances = await binance.futuresBalance()
    if(balances[6].balance < 10)
      quantitiy = () */
    
    //console.log(quantity)
    console.info( await binance.futuresMarketBuy( 'BTCUSDT', quantity ) );

    let acc = await binance.futuresAccount();
    let entryPrice = 0.0;
    acc.positions.forEach(element => {
      if(element.symbol == "BTCUSDT")
        entryPrice = element.entryPrice;
    });

    console.log(entryPrice)
    
    let price = (entryPrice*0.995).toFixed(1);
    console.log(price)
    let order = await binance.futuresMarketSell("BTCUSDT", quantity, {type: "STOP_MARKET", stopPrice: price, reduceOnly: true});
    console.log(order)
    
    price = (entryPrice*1.002).toFixed(1);
    order = await binance.futuresMarketSell("BTCUSDT", quantity, {type: "TAKE_PROFIT_MARKET", stopPrice: price, reduceOnly: true});
    console.log(order)

});


module.exports = router;
