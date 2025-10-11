import mongoose from "mongoose";

// tao schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    status:{
        type: String,
        enum: ["active" , "completed"],
        default : "active"
    },
    completeAt:{
        type: Date,
        default: null
    },
},
    {
        timestamps :true // create va update se tu dong tao ra khi co task ko can nhap
    }
)

//tao model 
const Task = new mongoose.model("Task", taskSchema)
export default Task