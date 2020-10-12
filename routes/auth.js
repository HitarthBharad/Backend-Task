const app = require('express')
const router = app.Router()
const jwt = require('jsonwebtoken')
const User = require('../model/user.model')

router.post('/login', async (req, res) =>{
    try {
        const user = await User.findOne({ username: req.body.username })
        console.log("sdcsdcdsc")
        if(user) {
            if(user.password == req.body.password) {
                const token = jwt.sign({_id: user._id}, 'dar')
                return res.status(200).json(token)
            } else {
                return res.sendStatus(500)
            }
        } else {
            const nuser = await User.create({ username: req.body.username, password: req.body.password })
            const token = jwt.sign({_id: nuser._id}, 'dar')
            return res.status(200).json(token)
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = router
