const express = require('express')
const query = require('../db').query

const router = express.Router()

const selectStats = 'SELECT * FROM stats WHERE partner_id = ? AND MONTH(date)=DATE_FORMAT(?, "%c") AND YEAR(date)=DATE_FORMAT(?, "%Y")'

router.get('/', (req, res) => {
  res.send('API')
})

router.get('/:date/:id', (req, res) => {
  console.log('params ' + JSON.stringify(req.params))
  query(selectStats, [req.params.id, req.params.date, req.params.date]).then(result => {
    res.json({status: 'ok', result: result})
  }).catch(err => {
    console.log('Error db promise')
    console.log(err)
    res.json({status: 'error', result: err.message})
  })
})

module.exports = router
