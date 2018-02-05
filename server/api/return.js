const router = require('express').Router()
module.exports = router
const { Return } = require('../db/models');




router.post('/', async (req, res, next) => {
  try {
    const returns = await Return.create(req.body)
    console.log(returns)
    res.json(returns)
  }
  catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const returns = await Return.findAll()
    res.json(returns)
  }
  catch (error) {
    next(error)
  }
})
