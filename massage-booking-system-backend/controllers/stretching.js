const stretchingRouter = require('express').Router()
const bodyParser = require('body-parser')
stretchingRouter.use(bodyParser.json())

stretchingRouter.get('/current', async (req, res, next)=>{ 
    const TestObject = {message:'moi'}
    res.send(TestObject)
})

module.exports = stretchingRouter