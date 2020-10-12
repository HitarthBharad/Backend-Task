const mongoose = require('mongoose')

const uri = 'mongodb+srv://201701223:201701223@cluster0.3mutt.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(uri, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
.then((data) => {
    console.log(`MongoDB is Connected On ${data.connection.host}`)
})
