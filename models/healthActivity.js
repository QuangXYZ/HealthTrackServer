import { Schema, model } from "mongoose";

// Step Schema
const stepSchema = new Schema({
    numberStep: { type: Number },
    calo: { type: Number },
    distance: { type: Number },
    time: { type: String },
    level: { type: String },
});

// Sleep Schema
const sleepSchema = new Schema({
    sleepTime: { type: String },
});

// HeartRate Schema
const heartRateSchema = new Schema({
    rate: { type: Number },
});

// BodyComposition Schema
const bodyCompositionSchema = new Schema({
    rate: { type: Number },
});

const bloodPressureSchema = new Schema({
    rate: { type: Number },
});

const amountWaterTime = new Schema({
    drinkingTime: { type: String},
    amountDrinking: {type: Number},
})

const waterInTake = new Schema({
    totalAmountWater: { type: Number},
    listAmountWater: [amountWaterTime],
})

// HealthActivity Schema
const healthActivitySchema = new Schema({
    idUser: { type: String },
    steps: { type: stepSchema },
    sleep: { type: sleepSchema },
    // date: { type: Date, default: Date.now },
    date: { type: String, default: new Date().toISOString().split('T')[0] },
    bloodPressure: { type: bloodPressureSchema },
    heartRate: { type: heartRateSchema },
    bodyComposition: { type: bodyCompositionSchema },
    waterInTake: { type: waterInTake},
});

// const Step = model('Step', stepSchema);
// const Sleep = model('Sleep', sleepSchema);
// const HeartRate = model('HeartRate', heartRateSchema);
// const BloodPressure = model('BloodPressure', bloodPressureSchema);
// const BodyComposition = model('BodyComposition', bodyCompositionSchema);
const HealthActivity = model('HealthActivity', healthActivitySchema);

export default HealthActivity;
