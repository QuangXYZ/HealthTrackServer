import { HealthActivity } from "../models/index.js"

const insertHealthActivity = async ({
    id,
    idUser,
    steps,
    sleep,
    // date,
    bloodPressure,
    heartRate,
    bodyComposition,
    waterInTake,
}) => {
    const healthActivity = await HealthActivity.create({
        id,
        idUser,
        steps,
        sleep,
        // date,
        bloodPressure,
        heartRate,
        bodyComposition,
        waterInTake,
    });
    return healthActivity;
}

const getDataHealth = async (idUser, date) => {
    let filteredHealthActivity = await HealthActivity.aggregate([
        {
            $match: {
                $or: [
                    {
                        idUser: { $regex: `.*${idUser}.*`, $options: "i" }
                    },
                    {
                        date: { $regex: `.*${date}.*`, $options: "i" }
                    },
                ]
            }
        }
    ])
    return filteredHealthActivity
}

const updateHealthActivity = async ({ idUser, date, newData }) => {
    try {
        const existingRecord = await HealthActivity.findOne({ idUser, date });

        if (!existingRecord) {
            throw new Error('Health activity not found for the given idUser and date.');
        }

        const updatedHealthActivity = await HealthActivity.findOneAndUpdate(
            { idUser, date },
            {
                $set: {
                    idUser: newData.idUser ?? existingRecord.idUser,
                    date: newData.date ?? existingRecord.date,
                    steps: newData.steps ?? existingRecord.steps,
                    sleep: newData.sleep ?? existingRecord.sleep,
                    bloodPressure: newData.bloodPressure ?? existingRecord.bloodPressure,
                    heartRate: newData.heartRate ?? existingRecord.heartRate,
                    bodyComposition: newData.bodyComposition ?? existingRecord.bodyComposition,
                },
            },
            { new: true }
        );

        return updatedHealthActivity;
    } catch (error) {
        throw error;
    }
};

const addAmountWaterTime = async (idUser, date, amountWaterTime) => {
    try {
        const result = await HealthActivity.findOneAndUpdate({
            idUser, date
        },
            {
                $push: { 'waterInTake.listAmountWater': amountWaterTime },
                $inc: { 'waterInTake.totalAmountWater': amountWaterTime.amountDrinking },
            },
            { new: true }
        );
        return result;
    } catch (error) {
        throw error;
    }
}

const deleteAmountWaterTime = async (idUser, date, amountWaterTimeId) => {
    try {
        const result = await HealthActivity.findOneAndUpdate(
            {
                idUser: { $regex: `.*${idUser}.*`, $options: 'i' },
                date: { $regex: `.*${date}.*`, $options: 'i' },
                'waterInTake.listAmountWater._id': amountWaterTimeId,
            },
            {},
            { new: true }
        ).lean();

        if (result) {
            const amountWaterTime = result.waterInTake.listAmountWater.find(item => item._id.toString() === amountWaterTimeId);
            if (amountWaterTime) {
                result.waterInTake.totalAmountWater -= amountWaterTime.amountDrinking;
                result.waterInTake.listAmountWater = result.waterInTake.listAmountWater.filter(item => item._id.toString() !== amountWaterTimeId);

                // Lưu lại dữ liệu đã cập nhật
                await HealthActivity.findByIdAndUpdate(result._id, result, { new: true });
            }
        }

        return result;
    } catch (error) {
        throw error;
    }
};

export default {
    insertHealthActivity,
    getDataHealth,
    updateHealthActivity,
    addAmountWaterTime,
    deleteAmountWaterTime
}