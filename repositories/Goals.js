import { Goals } from "../models/index.js";

const insertGoals = async({
    idUser,
    numberStepGoals,
    caloGoals,
    distanceGoals,
    timeGoals
}) => {
    const goals = await Goals.create({
        idUser,
        numberStepGoals,
        caloGoals,
        distanceGoals,
        timeGoals
    });
    return goals;
}

const getGoals = async (idUser) => {
    const goals = await Goals.find({ idUser: idUser });
    if (!goals) {
        throw new Exception('Cannot find height weight with idUser ' + idUser)
    }
    return goals
}

const updateGoals = async ({ idUser, newData }) => {
    try {
        const existingRecord = await Goals.findOne({ idUser });

        if (!existingRecord) {
            throw new Error('Health activity not found for the given idUser .');
        }

        const updatedGoals = await Goals.findOneAndUpdate(
            { idUser },
            {
                $set: {
                    idUser: newData.idUser ?? existingRecord.idUser,
                    numberStepGoals: newData.numberStepGoals ?? existingRecord.numberStepGoals,
                    caloGoals: newData.caloGoals ?? existingRecord.caloGoals,
                    distanceGoals: newData.distanceGoals ?? existingRecord.distanceGoals,
                    timeGoals: newData.timeGoals ?? existingRecord.timeGoals,
                },
            },
            { new: true }
        );

        return updatedGoals;
    } catch (error) {
        throw error;
    }
};

export default {
    getGoals,
    insertGoals,
    updateGoals
}