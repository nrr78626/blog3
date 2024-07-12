import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    auther: {
        type: mongoose.Schema.ObjectId,
        ref: "Auther"
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
    }
}, { timestamps: true })

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema)