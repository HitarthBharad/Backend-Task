const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

app.use(express.json())

require('./connect/database')

const Jimp = require("jimp")
app.post('/resize', (req, res) => {
    const imgURL = req.body.url
    Jimp.read(imgURL, function(err,img){
        if (err) throw err;
        img.resize(50, 50).getBase64( Jimp.AUTO , function(e,img64){
            if(e)throw e
            res.send('<img src="'+img64+'">')
        });
    });
});

const route = require('./route/auth')
app.use('/', route)
const survey = require('./route/survey')
app.use('/survey', survey)

app.listen(process.env.PORT, () => {console.log(`Server started on 5000`)})