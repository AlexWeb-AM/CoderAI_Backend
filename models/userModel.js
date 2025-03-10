import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    routeId:{type:String,required:true}
})

const userModel = mongoose.model('user',userScheme)

export default userModel