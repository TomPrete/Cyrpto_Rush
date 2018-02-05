const router = require('express').Router()
module.exports = router
var Client = require('coinbase').Client;
var client = new Client({'apiKey': 'API KEY',
                         'apiSecret': 'API SECRET',
                         'CB-VERSION': this.version || '2017-08-07'
                        });


router.get('/btc-usd', (req, res, next) => {
  client.getBuyPrice({'currencyPair': 'BTC-USD'}, function(err, price) {
    if (err) {
      next(err)
    } else {
      res.send(price);
    }
  });
})

router.get('/eth-usd', (req, res, next) => {
  client.getBuyPrice({'currencyPair': 'ETH-USD'}, function(err, price) {
    if (err) {
      next(err)
    } else {
      res.send(price);
    }
  });
})

// router.get('/btc-eth', (req, res, next) => {
//   client.getBuyPrice({'currencyPair': 'BTC-ETH'}, function(err, price) {
//     if (err) {
//       next(err)
//     } else {
//       res.send(price);
//     }
//   });
// })


// client.getCurrencies(function(err, currencies) {
//   console.log(currencies);
// });

router.get('/currencies', (req, res, next) => {
  client.getCurrencies(function(err, currencies) {
    if (err) {
      next(err)
    } else {
      res.send(currencies);
    }
  });
})
