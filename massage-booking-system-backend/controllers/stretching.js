const stretchingRouter = require('express').Router()
const bodyParser = require('body-parser')
stretchingRouter.use(bodyParser.json())

const default_object = {
    participants: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
    ],
    time: {}
}

stretchingRouter.get('/current', async (req, res, next) => {
    res.send(default_object)
})

stretchingRouter.post('/current', async (req, res, next) => {
    try {
        const body = req.body
        console.log('body', body)
    } catch (exception) {
        next(exception)
    }
})





module.exports = stretchingRouter