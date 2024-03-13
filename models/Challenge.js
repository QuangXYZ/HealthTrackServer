import mongoose, { Schema, ObjectId} from "mongoose"
const Challenge = mongoose.model("Challenge", new Schema({
    id : {type : ObjectId},
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : false,
    },
    exp: {type :Number, required : false},
    
    dateStart: {
        type: Date,
        required: false,
        default: Date.now
    },
    dateEnd: {
        type: Date,
        required: false,
        
    },
    target: {
        type: Number,
        required: false,
    },
    listMember: [{
        userId: {
            type: String,
        },
        userName: {
            type: String,
        },
        accept: {
            type: Boolean,
            default: false,
        }
    }],
    userRecords: [{
        userId: {
            type: String,
        },
        userName: {
            type: String,
        },
        stepTotal: {
            type: Number,
            default: 0,
        }
    }],
    access: {
        type: String,
        enum: {
            values: ['Private', 'Public'],
            message: '{VALUE} is not supported'
        },
        required: true,
    }
    }
))

export default Challenge