import { Schema, model } from "mongoose";
const stepSchema = new Schema({
    idUser: { type: String},
    numberStep: { type: Number },
    calo: { type: Number },
    distance: { type: Number },
    time: { type: String },
    date: { type: String, default: new Date().toISOString().split('T')[0] },
});

const Step = model('Step', stepSchema);

export default Step