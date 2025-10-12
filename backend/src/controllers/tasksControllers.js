import Task from "../models/Task.js"

// Goi tat ca cac task
export const getAllTasks = async (req, res)=>{

    const {filter ='today'} = req.query
    const now = new Date()
    let startDate
    
    switch(filter){
        case 'today':{
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            break
        }
        case 'week':{
            const mondayDate = now.getDate() - (now.getDate() - 1) - (now.getDate() === 0 ? 7 : 0)
            startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate)
            break
        }

        case 'month':{
            startDate = new Date(now.getFullYear(), now.getMonth(), 1)
            break
        }
        case 'all':
            default: {
                startDate = null 
            }
    }

    const query = startDate ? { createdAt: { $gte: startDate}} :{}


    try {
        // const tasks = await Task.find().sort({createdAt : -1})
        const result = await Task.aggregate([
            {
                $match: query
            },
            {
                $facet:{
                    tasks: [{$sort: {createdAt: -1}}],
                    activeCount: [{$match: {status: 'active'}},{$count: 'count'}], 
                    completeCount : [{$match: {status: 'completed'}},{$count: 'count'}], 
                }
            }
        ])

        const tasks = result[0].tasks
        const activeTaskCount = result[0].activeCount[0]?.count || 0
        const completeTaskCount  = result[0].completeCount [0]?.count || 0

        res.status(200).json({tasks, activeTaskCount, completeTaskCount})
    } catch (error) {
        console.log("Lỗi khi gọi getAll", error)
        res.status(500).json({mess: "Lỗi hệ thống"})
    }
}

//Tạo ra task mới
export const createTask = async(req, res) =>{
    try {
        const {title} = req.body
        const task = new Task({title})
        const newTask = await task.save()
        res.status(200).json(newTask)

    } catch (error) {
        console.log("Lỗi khi gọi create", error)
        res.status(500).json({mess: "Lỗi hệ thống"})
    }
}

//Cập nhật lại nhiệm vụ
export const updateTask =  async(req, res)=>{
    try {
        const {title, status, completed} = req.body
        const updateTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                status,
                completed
            },
            {new : true}
        )

        if(!updateTask){
            return res.status(400).json({mess: "Nhiệm vụ không tìm thấy"})
        }
        res.status(200).json(updateTask)

    } catch (error) {
        console.log("Lỗi khi gọi update", error)
        res.status(500).json({mess: "Lỗi hệ thống"})
    }
}

export const deleteTask =async (req, res)=>{
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id)
        if(!deleteTask){
            res.status(400).json({mess: "Không tìm thấy id"})
        }
        res.status(200).json(deleteTask)
    } catch (error) {
        console.log("Lỗi khi gọi delete", error)
        res.status(500).json({mess: "Lỗi hệ thống"})
    }
}