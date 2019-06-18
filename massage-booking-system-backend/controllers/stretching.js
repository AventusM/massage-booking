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





module.exports = stretchingRouter