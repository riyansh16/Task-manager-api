const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.get('/',(req,res)=>{
    res.sendFile('./public/front.html',{root:__dirname})
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})