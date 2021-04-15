const dotenv = require('dotenv').config()
const express = require('express')
const userRouters = require('./routers/user_router')
const errorMiddleware = require('./middleware/errorMiddleware')
require('./config/database')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routers
app.use('/api/users', userRouters)

//middleware
app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.json(
        {
            'message': 'Welcome simple api application'
        }
    )
})

app.listen(process.env.PORT, () => {
    console.log('Server running. Port:' + process.env.PORT)
})