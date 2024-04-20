import mongoose, { Document } from 'mongoose';

export interface User extends Document {
    fullName: string;
    email: string;
    password: string;
    contactNumber: number;
    role?: "Admin" | "Principal" | "Coordinator" | "Warden" | "Gatekeeper";
    isVerified: boolean;
    otp?: string;
    otpExpiry?: Date;
    resetPasswordToken?: string;
    resetPasswordTokenExpiry?: Date;
}

const userSchema = new mongoose.Schema(
    {
        fullName:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        contactNumber:{
            type:Number,
            required:true,
        },
        role:{
            type:String,
            enum:["Admin", "Principal", "Cordinator", "Warden", "Gatekeeper"]
        },
        isVerified:{
            type:Boolean,
            default:false
        },
        otp:{
            type:String,
        },
        otpExpiry:{
            type:Date,
        },
        resetPasswordToken:{
            type:String
        },
        resetPasswordTokenExpiry:{
            type:Date
        }
    }
)

const User = mongoose.model<User>("User", userSchema);

export default User;