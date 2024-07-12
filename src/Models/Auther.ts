import mongoose from "mongoose";

const autherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date
}, { timestamps: true })

export default mongoose.models.Auther || mongoose.model("Auther", autherSchema)