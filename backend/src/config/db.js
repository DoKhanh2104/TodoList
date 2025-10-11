import mongoose from 'mongoose'

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING)
        console.log("Ket noi thanh cong")
    } catch (error) {
        console.error("Loi khi ket noi", error)
         process.exit(1) 
        // thoat khi ket noi that bai(1) , thanh cong (0)
    }
}