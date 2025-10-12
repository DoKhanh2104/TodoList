import React, {  useState } from "react"
import { Card } from "./ui/card"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Calendar, CheckCircle2, Circle, DeleteIcon, SquarePen, Trash2 } from "lucide-react"
import { Input } from "./ui/input"
import api from "@/lib/axios"
import { toast } from "sonner"



const TaskCard= ({task,index,handleTaskChanged})=>{
    
    const [isEditting, setIsEditting] = useState(false)
    const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "")

    const handleKeyPress=(e)=>{
        if(e.key === 'Enter')
            updateTask()
    }

    const toogleTaskButton = async () => {
        try {
            if(task.status === 'active'){
                await api.put(`tasks/${task._id}`,{
                    status: 'completed',
                    completedAt: new Date().toISOString(),
                })
                toast.success(`Nhiệm vụ ${task.title} đã hoàn thành`)
            }else{
                await api.put(`tasks/${task._id}`,{
                    status: 'active',
                    completedAt: null,
                })
                toast.success(`Nhiệm vụ ${task.title} chưa hoàn thành`)
            }
            handleTaskChanged()
        } catch (error) {
            console.error("Đã có lỗi", error)
            toast.error("Đã có lỗi")
        }
    }
    // XU LY LOGIC
    const deleteTask=async (taskId)=>{
        try {
            await api.delete(`/tasks/${taskId}`)
            toast.success("Nhiệm vụ đã xóa")
            handleTaskChanged()
        } catch (error) {
            console.error("Bị lỗi khi xóa", error)
            toast.error("Bị lỗi khi xóa")
        }
    } 

    const updateTask = async () => {
        try {
            setIsEditting(false)
            await api.put(`/tasks/${task._id}`,{
                title: updateTaskTitle
            })
            toast.success(`Nhiệm vụ đã đổi thành ${updateTaskTitle}`)
            handleTaskChanged()
        } catch (error) {
            console.error("Bị lỗi khi update", error)
            toast.error("Bị lỗi khi update")
        }
    }


    return (
        <Card className={cn(
            "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
            task.status === 'completed' && 'opacity-75' 
        )}
            style ={{animationDelay: `${index *50}ms`}}
        >
            <div className="flex items-center gap-4">
                {/* nút tròn */}
                <Button onClick={toogleTaskButton} variant={"ghost"} size={'icon'} className={cn(
                    "flex-shrink-0 size-8 rounded-full transition-all duration-200", task.status==='completed' ?'text-success hover:text-success/80':
                    'text-muted-foreground hover:text-primary'
                )}>
                    
                    {task.status === 'completed'  ? ( <CheckCircle2 className="size-5"/> ):(<Circle className="size-5 "/>) }

                </Button>

                {/* Hiển thị hoặc chỉnh sửa tiêu đề */}
                <div className="flex-1 min-w-0">
                    {isEditting ? (
                        <Input 
                        onBlur ={()=>{
                            setIsEditting(false)
                            setUpdateTaskTitle(task.title || "")
                        }}
                        value={updateTaskTitle} 
                        onChange={(e)=>setUpdateTaskTitle(e.target.value)} 
                        onKeyPress={handleKeyPress} placeholder='Cần phải làm gì?' 
                        className={"flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"} />
                    ): (
                        <p className={cn(
                            "text-base transition-all duration-200",
                            task.status === "completed"
                            ?"line-through text-muted-foreground"
                            :"text-foreground"
                        )}>
                            {task.title}
                        </p>
                    ) }

                    {/* Ngày hoàn thành */}
                    <div className="flex items-center gap-2 mt-1">
                        <Calendar className="size-3 text-muted-foreground"/>
                        <span className="text-xs text-muted-foreground">
                            {new Date(task.createdAt).toLocaleString()}
                        </span>

                        {task.completedAt && (
                            <>
                                <span className="text-xs text-muted-foreground "></span>
                                <Calendar className="size-3 text-muted-foreground"/>
                                <span className="">{new Date(task.completedAt).toLocaleString()}</span>
                            </>
                        )}

                    </div>
                </div>
                
                

                {/* nút chỉnh và nút xóa */}
                <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
                    {/* nut edit */}
                    <Button onClick={()=>{
                        setIsEditting(true)
                        setUpdateTaskTitle(task.title || "")
                    }} variant={"ghost"} size={"icon"} className={"flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"}>
                        <SquarePen className="size-4 "></SquarePen>
                    </Button>

                    {/* but delete */}
                    <Button onClick={()=>deleteTask(task._id)} variant={"ghost"} size={"icon"} className={"flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"}>
                        <Trash2 className="size-4"></Trash2>
                    </Button>
                        
                </div>
            </div>

 
        </Card>
    )
}
export default TaskCard 