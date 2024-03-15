import { Schema, model } from "mongoose";
const GoalsSchema = new Schema({
    idUser: { type: String},
    numberStepGoals: { type: Number },
    caloGoals: { type: Number },
    distanceGoals: { type: Number },
    timeGoals: { type: String },
});

const Goals = model('Goals', GoalsSchema);

export default Goals;