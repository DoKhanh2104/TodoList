import React from "react"

const Footer= ({completeTaskCount = 0, activeTaskCount =0})=>{
    return (
        <>
            {completeTaskCount + activeTaskCount > 0 && (
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        {
                            completeTaskCount > 0 && (<>
                                Tuyệt vời ! Bạn đã hoàn thành {completeTaskCount} nhiệm vụ
                                {
                                    activeTaskCount > 0 && `, còn ${activeTaskCount} nhiệm vụ nữa thôi, Cố lênnn`
                                }
                            </>)
                        }

                        {completeTaskCount === 0 && activeTaskCount> 0 && (
                            <>Hãy bắt đầu làm {activeTaskCount} nhiệm vụ nào !!!</>
                        )}
                    </p>
                </div>
            )}
        </>
    )
}
export default Footer