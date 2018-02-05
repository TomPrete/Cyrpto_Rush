const router = require('express').Router()
module.exports = router


router.use('/coinbase', require('./coinbase'))
router.use('/kraken', require('./kraken'))
router.use('/return', require('./return'))

router.use('/users', require('./users'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
