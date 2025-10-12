import AddTask from "@/components/AddTask";
import DateTime from "@/components/DateTime";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StartsAndFilters from "@/components/StartsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";



const HomePage =()=>{
    const [taskBuffer, setTaskBuffer] = useState([]) 
    const [activeTaskCount, setActiveTaskCount] = useState(0)
    const [completeTaskCount, setCompleteTaskCount] = useState(0)
    const [filter, setFilter] = useState('all')
    const [dateQuery, setDateQuery] = useState('today')
    const [page, setPage] = useState(1)


    useEffect(()=>{
        fetchTasks()
    },[dateQuery]) 

    useEffect(()=>{
        setPage(1)
    },[filter,dateQuery]) 


    //logic
    const fetchTasks = async()=>{
        try {
            const res = await api.get(`/tasks?filter=${dateQuery}`)
            setTaskBuffer(res.data.tasks)
            setActiveTaskCount(res.data.activeTaskCount)
            setCompleteTaskCount(res.data.completeTaskCount)
            console.log(res.data)
        } catch (error) {
            console.log("Lỗi xảy ra khi truy xuất tasks", error)
            toast.error("Lỗi xảy ra khi truy xuất tasks")
        }
    }
    const handleTaskChanged = () => {
        fetchTasks()
    }

    const handleNext = () => {
        if(page < totalPages){
            setPage((prev) => prev + 1)
        }
    }

    const handlePre = () => {
        if(page > 1){
            setPage((prev) => prev - 1)
        }
    }

    const handleChangePage = (newPage) =>{
        setPage(newPage)
    }

    //biens
    const filteredTasks = taskBuffer.filter((task)=>{
        console.log(task)
        switch(filter){
            case 'active':
                return task.status === 'active'
            case 'completed':
                return task.status === 'completed'
            default:
                return true
        }
    })

    

    const visibleTaks = filteredTasks.slice(
        (page -1) * visibleTaskLimit, page * visibleTaskLimit
    )

    if(visibleTaks.length === 0) {
        handlePre()
    }

    const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit) 

    return (
        
        <div className="min-h-screen w-full bg-[#fefcff] relative">
        {/* Dreamy Sky Pink Glow */}
            <div
                className="absolute inset-0 z-0"
                style={{
                backgroundImage: `
                radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
                radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
                }}
            />
        <div className=" container pt-8 mx-auto relative z-10">
            <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
                {/* Đầu trang */}
                <Header/>

                {/* Tạo nhiệm vụ */}
                <AddTask handleNewTaskAdded={handleTaskChanged}/>

                {/* Thống kê và bộ lọc  */}
                <StartsAndFilters activeTaskCount={activeTaskCount} completeTaskCount={completeTaskCount} 
                    filter={filter} setFilter={setFilter}
                />

                {/* Danh sách nhiệm vụ */}
                <TaskList handleTaskChanged={handleTaskChanged} filteredTasks={visibleTaks} filter={filter}/>

                {/* Phân trang và lọc theo ngày */}
                 <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <TaskListPagination 
                    handleChangePage = {handleChangePage}
                    handleNext = {handleNext}
                    handlePre = {handlePre}
                    totalPages = {totalPages}
                    page = {page}
                    />
                    <DateTime dateQuery={dateQuery} setDateQuery={setDateQuery}/>
                 </div>

                {/* Chân trang */}
                <Footer activeTaskCount={activeTaskCount} completeTaskCount={completeTaskCount}/>

            </div>
        </div>
        </div>
        
        
    )
} 

export default HomePage