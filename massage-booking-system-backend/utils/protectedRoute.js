
const jsonWebToken = require('jsonwebtoken')

// 1. CAN REGISTER NEW USER WITHOUT TOKEN
// 2.CAN LOGIN WITHOUT TOKEN

const no_token_api_white_list = [
    { url: '/users', method: 'POST' },
    { url: '/login', method: 'POST' }
]

const routeProtector = (req, res, next) => {
    const found_white_list_match = no_token_api_white_list.find(entry => entry.url === req.url)
    if (found_white_list_match) {
        next()
    } else {

        let token = null
        let authorization = req.headers.authorization

        if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
            token = authorization.substring(7)
        }

        console.log('token', token)
        const decodedToken = jsonWebToken.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }
        next()
    }
}

module.exports = { routeProtector }