import mongoose, { Schema, ObjectId} from "mongoose"
import isEmail from "validator/lib/isEmail.js"
const User = mongoose.model("User", new Schema({
    id : {type : ObjectId},
    name : {
        type : String,
        required : true,
        validate : {
            validator : (value) => {
                return value.length >= 5
            },
            message : "Username must be at least 5 characters"
        }

    },
    email : {
        type : String,
        validate : {
            validator : (value) => isEmail,
            message : "Email is incorrect format"
        }
    },
    password : { 
        type : String,
        required : true,
    
    },
    phoneNumber : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    }

     
}))

export default User