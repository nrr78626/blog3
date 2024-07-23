import mongoose from "mongoose";
import BlogCategory from "./BlogType/BlogType";

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
    category:{
        type:String,
        enum:[BlogCategory.any,BlogCategory.news,BlogCategory.result,BlogCategory.sports,BlogCategory.stocks,BlogCategory.tech],
        default:BlogCategory.any
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