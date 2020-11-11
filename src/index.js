const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const blogRouter = require('./routers/blog')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(blogRouter)

app.listen(3000, () => {
    console.log('Server is up on port ' + 3000)
})