import { Goals } from "../models/index.js";

const insertStepGoals = async({
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