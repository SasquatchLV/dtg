require('dotenv').config()

const express = require('express')
const morgan = require('./middleware/morgan')
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser")
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')
const routes = require('./routes/index')

// express app
const app = express()

// Add the cookie-parser
app.use(cookieParser());

// Add morgan middleware
app.use(morgan)

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// middleware
app.use(express.json())

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')))

// routes
app.use('/', require('./routes/root'))
app.use('/api', routes)



// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
