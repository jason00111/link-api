const express = require('express')

const app = express()

const routes = require('./routes')

app.use('/users', routes)

app.listen(3000)
