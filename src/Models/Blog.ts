import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    auther: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: Array,
        required: true
    },
    images: {
        type: String
    },
    autherName:{
        type:String,
        required:true
    }
}, { timestamps: true })

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema)