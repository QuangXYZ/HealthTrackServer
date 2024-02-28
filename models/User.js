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
        require : false
    },
    friends: {
        type: [String],
        require : false
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
    }
}
))

export default User