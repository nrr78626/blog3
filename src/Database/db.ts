import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            return
        }
        await mongoose.connect(process.env.NEXT_PUBLIC_DB!)
        console.log("Connected to Database")
    } catch (error) {
        console.log(error)
    }
}

export default connectToDb