
import React from "react"
import TaskEmptyState from "./TaskEmptyState"
import TaskCard from "./TaskCard"

const TaskList= ()=>{
    let filter = 'completed'
    const filteredTasks= [
        {
            _id :1,
            title: "học react",
            status: "active",
            completedAt: null,
            createdAt : new Date()
        },
        {
            _id :2,
            title: "học spring boot ", 
            status: "complete",
            completedAt: null,
            createdAt : new Date()
        },
    ]

    if(!filteredTasks || filteredTasks.length === 0 ){
        return <TaskEmptyState filter={filter}/>
    }

    return (
        <div className="space-y-3">
            {filteredTasks.map((task, index)=>(
                <TaskCard
                    key={task._id || index}
                    task={task}
                    index={index}
                />
            ))}
        </div>
    )
}
export default TaskList