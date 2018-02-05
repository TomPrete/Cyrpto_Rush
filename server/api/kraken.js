const router = require('express').Router()
module.exports = router
const key          = ''; // API Key
const secret       = ''; // API Private Key
const KrakenClient = require('kraken-api');
const kraken       = new KrakenClient(key, secret);


router.get('/btc-usd', (req, res, next) => {
  kraken.api('Ticker', { pair: 'XXBTZUSD' }, (err, result) => {
    if (err) {
      next(err)
    } else {
      res.send(result)
    }
  });
})

router.get('/eth-usd', (req, res, next) => {
  kraken.api('Ticker', { pair: 'XETHZUSD' }, (err, result) => {
    if (err) {
      next(err)
    } else {
      res.send(result)
    }
  });
})

