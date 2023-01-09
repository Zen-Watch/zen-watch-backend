require('dotenv').config()

const express = require('express')
const router = express.Router()

router.get('/healthz', (req, res) => {
    res.send('hello world!')
})

router.post('/event', (req, res) => {
    transaction_hash = req.body.hash
    resp_json = {
        transaction_hash
    }
    import('../modules/alchemy.mjs').then(mod => console.log('foo', mod.getLatestBlock()));
      
    res.status(200).send(resp_json)
})

module.exports = router
