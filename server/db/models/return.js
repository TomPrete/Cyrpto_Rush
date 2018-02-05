
const Sequelize = require('sequelize')
const db = require('../db')

const Return = db.define('return', {
  percentage: {
    type: Sequelize.FLOAT,
    unique: false,
    allowNull: true
  }
})

module.exports = Return
