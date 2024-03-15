import { Step } from "../models/index.js";

// const insertStep = async({
//     idUser,
//     numberStep,
//     calo,
//     distance,
//     time
// }) => {
//     const step = await Step.create({
//         idUser,
//         numberStep,
//         calo,
//         distance,
//         time
//     });
//     return step;
// }

const insertStep = async ({ idUser, numberStep, weight }) => {

    //Đối với nam: Chiều dài bước chân (cm) = 0,67 * Chiều cao (cm)
    //Đối với nữ: Chiều dài bước chân (cm) = 0,63 * Chiều cao (cm)

    //Quãng đường = Số bước chân x Chiều dài bước chân
    const distance = (numberStep * 0.7 / 1000).toFixed(1);

    //Thời gian = Quãng đường / Tốc độ
    const time = Math.ceil(distance / 5 * 60); //phút

    //calo = METs * cân nặng(kg) * thời gian vận động(h) * 1.05
    const calo = Math.ceil(4 * weight * time / 60 * 1.05);

    const step = await Step.create({
        idUser,
        numberStep,
        distance,
        time,
        calo,
    });
    return step;
};

// const getStep = async (idUser, date) => {
//     let filteredStep = await Step.aggregate([
//         {
//             $match: {
//                 $or: [
//                     {
//                         idUser: { $regex: `.*${idUser}.*`, $options: "i" }
//                     },
//                     {
//                         date: { $regex: `.*${date}.*`, $options: "i" }
//                     },
//                 ]
//             }
//         }
//     ])
//     return filteredStep
// }

const getStep = async (idUser, date) => {
    // kiểm tra tham số đầu vào
    if (!idUser || !date) {
        throw new Error('Missing required parameters: idUser and date');
    }

    // Lọc idUser and date bằng toán tử $and 
    const filter = {
        $and: [
            { idUser: { $eq: idUser } }, //$eq: tính duy nhất
            { date: { $eq: date } }
        ]
    };

    try {
        const filteredSteps = await Step.find(filter);
        return filteredSteps;
    } catch (error) {
        console.error('Error fetching steps:', error);
        throw error;
    }
};


const updateStep = async ({ idUser, date, newData }) => {
    try {
        const existingRecord = await Step.findOne({ idUser, date });

        if (!existingRecord) {
            throw new Error('Step not found for the given idUser and date.');
        }

        //Quãng đường = Số bước chân x Chiều dài bước chân
        const distance = (newData.numberStep * 0.7 / 1000).toFixed(1);

        //Thời gian = Quãng đường / Tốc độ
        const time = Math.ceil(distance / 5 * 60); //phút

        //calo = METs * cân nặng(kg) * thời gian vận động(h) * 1.05
        const calo = Math.ceil(4 * newData.weight * time / 60 * 1.05);

        const updatedStep = await Step.findOneAndUpdate(
            { idUser, date },
            {
                $set: {
                    idUser: newData.idUser ?? existingRecord.idUser,
                    date: newData.date ?? existingRecord.date,
                    numberStep: newData.numberStep ?? existingRecord.numberStep,
                    calo: calo ?? existingRecord.calo,
                    distance: distance ?? existingRecord.distance,
                    time: time ?? existingRecord.time,
                },
            },
            { new: true }
        );

        return updatedStep;
    } catch (error) {
        throw error;
    }
};

export default {
    insertStep,
    getStep,
    updateStep
}