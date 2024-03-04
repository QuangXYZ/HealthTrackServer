import { Schema, model } from "mongoose";

const dailyLogSchema = new Schema({
    date: { type: Date, default: Date.now},
    symptoms: [{ type: String }],
    mood: [{ type: String }],
    sexualActivity: { type: String },
    cervicalMucus: { type: String },
    spotting: { type: String },
    ovulationCheck: { type: String },
    others: [{ type: String }],
});

const healthCycleSchema = new Schema({
    idUser: { type: String, required: true },
    menstrualCycleStart: { type: Date, required: true },
    cycleLength: { type: Number, required: true },
    nextMenstrualCycle: { type: Date },
    ovulationDate: { type: Date },
    fertilityWindowStart: { type: Date },
    fertilityWindowEnd: { type: Date },
    dailyLog: [{ type: dailyLogSchema }],
});

const HealthCycle = model('HealthCycle', healthCycleSchema);

export default HealthCycle;
