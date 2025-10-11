import React from "react"

const Footer= ({completedTasksCount = 0, activateTasksCount =0})=>{
    return (
        <>
            {completedTasksCount + activateTasksCount > 0 && (
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        {
                            completedTasksCount > 0 && (<>
                                Tuyệt vời ! Bạn đã hoàn thành {completedTasksCount} nhiệm vụ
                                {
                                    activateTasksCount > 0 && `, còn ${activateTasksCount} nhiệm vụ nữa thôi, Cố lênnn`
                                }
                            </>)
                        }

                        {completedTasksCount === 0 && activateTasksCount> 0 && (
                            <>Hãy bắt đầu làm {activateTasksCount} nhiệm vụ nào !!!</>
                        )}
                    </p>
                </div>
            )}
        </>
    )
}
export default Footer