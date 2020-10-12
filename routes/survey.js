const app = require('express')
const router = app.Router()
const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    const bearer = req.headers['authorization']
    if(bearer !== undefined) {
        const token = bearer.split(' ')[1]
        jwt.verify(token, 'dar', (err, data) => {
            if(err) return res.sendStatus(403)
            req.body.user = data._id
            next()
        })
    } else {
        return res.sendStatus(403)
    }
}

const Survey = require('../model/survey.model')
const Result = require('../model/result.model')

const createSurvey = async (req, res) => {
    try {
        const survey = await Survey.create(req.body)
        return res.status(201).json(survey)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const takeSurvey = async (req, res) => {
    try {
        const result = await Result.create({user: req.body.user, survey: req.params.id, answers: req.body.answers})
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getResult = async (req, res) => {
    try {
        const result = await Result.find({survey: req.params.id}).populate({path: 'user', select: ['username']})
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { createSurvey, takeSurvey, getResult }




router.post('/', verifyToken, createSurvey)
router.put('/:id', verifyToken, takeSurvey)
router.get('/:id', verifyToken, getResult)

module.exports = router