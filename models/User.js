import mongoose, { Schema, ObjectId} from "mongoose"
export default mongoose.model("User", new Schema({
    id : {type : ObjectId},
     
}))