import { HeightWeight } from "../models/index.js";

const insertHeightWeight = async ({
    idUser,
    height,
    weight,
}) => {
    const heightWeight = await HeightWeight.create({
        idUser,
        height,
        weight,
    });
    return heightWeight;
}

const getHeightWeightByIdUser = async ({ id }) => {
    const heightWeight = await HeightWeight.find({id: id})
    if(!heightWeight) {
        throw new Exception('Cannot find HeightWeight with id' + id)
    }
    return heightWeight
}

// const updateHeightWeight = async ({ idUser, newData }) => {
//     try {
//         const heightWeights = await HeightWeight.findOne({idUser});

//         if (!heightWeights) {
//             throw new Error('heightWeights not found for the given idUser.');
//         }

//     const updatedHeightWeight = await HeightWeight.findOneAndUpdate(
//         {idUser},
//         {
//             $set: {
//                 idUser: newData.idUser ?? heightWeights.idUser,
//                 height: newData.height ?? heightWeights.height,
//                 weight: newData.weight ?? heightWeights.weight,
//             },
//         },
//         {new: true}
//     );

//     return updatedHeightWeight;
//     } catch (error) {
//         throw error;
//     }
    
// }

const updateHeightWeight = async ({ idUser, newData }) => {
    try {
        const existingRecord = await HeightWeight.findOne({ idUser});

        if (!existingRecord) {
            throw new Error('Health activity not found for the given idUser .');
        }

        const updatedHeightWeight = await HeightWeight.findOneAndUpdate(
            { idUser },
            {
                $set: {
                    idUser: newData.idUser ?? existingRecord.idUser,
                    height: newData.height ?? existingRecord.height,
                    weight: newData.weight ?? existingRecord.weight,
                },
            },
            { new: true }
        );

        return updatedHeightWeight;
    } catch (error) {
        throw error;
    }
};

export default {
    insertHeightWeight,
    getHeightWeightByIdUser,
    updateHeightWeight
}