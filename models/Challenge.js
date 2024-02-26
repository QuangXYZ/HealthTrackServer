import mongoose, { Schema, ObjectId} from "mongoose"
const Challenge = mongoose.model("Challenge", new Schema({
    id : {type : ObjectId},
    name : {
        type : String,
        required : true,
    },
    dateStart: {
        type: Date,
        required: true,
    },
    dateEnd: {
        type: Date,
        required: true,
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
    }]
    }
))

export default Challenge