import mongoose from "mongoose";
import roles from "./Roles/Roles";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    contact: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        reqquired: true
    },
    avatar: {
        type: String,
        default:"user.jpg"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    age:{
        type:Number,
        required:true
    },
    role: {
        type: String,
        enum: [roles.user, roles.admin, roles.moderatars, roles.superuser],
        default: roles.user
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    try {
        if (this.email === process.env.NEXT_PUBLIC_SUPERUSER?.toLowerCase()) {
            this.role = roles.superuser
            this.isVerified = true
        }
        next()
    } catch (error: any) {
        next(error)
    }
})

export default mongoose.models.User || mongoose.model("User", userSchema)