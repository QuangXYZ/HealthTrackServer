import mongoose, { Schema, ObjectId} from "mongoose"
import isEmail from "validator/lib/isEmail.js"
const Student = mongoose.model("Student", new Schema({
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
    phoneNumber : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    }

     
}))
export default Student