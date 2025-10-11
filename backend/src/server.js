import express from 'express'
import taskRoute from './routes/tasksRouters.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'


const app = express()
app.use(express.json())
dotenv.config()


const PORT = process.env.PORT || 5001


app.use("/api/tasks", taskRoute)


//kết nối rồi mới chạy server
connectDB().then(()=>{
    app.listen(PORT, ()=> {
    console.log(`Da chay server ${PORT}`)
})
})


