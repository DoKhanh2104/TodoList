import AddTask from "@/components/AddTask";
import DateTime from "@/components/DateTime";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StartsAndFilters from "@/components/StartsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import React, { useState } from "react";

const HomePage =()=>{
    const [taskBuffer, setTaskBuffer] = useState([])

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
                <AddTask/>

                {/* Thống kê và bộ lọc  */}
                <StartsAndFilters/>

                {/* Danh sách nhiệm vụ */}
                <TaskList/>

                {/* Phân trang và lọc theo ngày */}
                 <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <TaskListPagination/>
                    <DateTime/>
                 </div>

                {/* Chân trang */}
                <Footer/>

            </div>
        </div>
        </div>
        
        
    )
} 

export default HomePage