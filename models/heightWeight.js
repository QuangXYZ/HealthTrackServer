import { Schema, model } from "mongoose";

const heightWeighSchema = new Schema({
    idUser: { type: String },
    height: { type: Number},
    weight: { type: Number} 
});

const HeightWeight = model('HeightWeight', heightWeighSchema);
export default HeightWeight; 