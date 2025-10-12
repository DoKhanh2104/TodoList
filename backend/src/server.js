import express from 'express'
import taskRoute from './routes/tasksRouters.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'


const app = express()
//middlewares
app.use(express.json())
app.use(cors({origin: "http://localhost:5173"}))

dotenv.config()


const PORT = process.env.PORT || 5001


app.use("/api/tasks", taskRoute)


//kết nối rồi mới chạy server
connectDB().then(()=>{
    app.listen(PORT, ()=> {
    console.log(`Da chay server ${PORT}`)
})
})


