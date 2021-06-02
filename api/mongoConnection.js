const mongoose = require('mongoose')

const uri = 'mongodb://localhost:27017/proyecto3?poolSize=5&writeConcern=majority'

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
