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
        },
        required: true,
    },
    profilePicture: {
        data: Buffer, // Dữ liệu hình ảnh
        contentType: String ,// Loại dữ liệu của hình ảnh
    },
    password : { 
        type : String,
        required : true,
    
    },
    gender: {
        type: String,
        enum: {
            values: ['Male', 'Female'],
            message: '{VALUE} is not supported'
        },
        required: true,
    },
    badges: {
        type: [String],
        required : false
    },
    friends: {
        type: [String],
        required : false
    },
    dateOfBirth: {
        type: String,
        required: false,
        
    },
    healthActivity: {
        type: [String],
        required: false,
    },
    idChallenges: {
        type: [String],
        required: false,
    },

    level: {
        type: Number,
        default: 1,
        required: true
    },
    exp: {
        type: Number,
        default: 0,
        required: true
    },

}
))

export default User