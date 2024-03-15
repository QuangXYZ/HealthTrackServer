import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import Exception from '../exceptions/Exception.js';
import { MAX_RECORDS } from '../global/constants.js';
import { heightWeightRepository } from '../repositories/index.js';

async function getHeightWeightByIdUser(req, res) {
    const idUser = req.params.idUser
    try {
        const heightWeight = await heightWeightRepository.getHeightWeightByIdUser(idUser)
        res.status(HttpStatusCode.OK).json({
            message: 'Get height weight successfully',
            data: heightWeight,
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
        })
    }
}

async function insertHeightWeight(req, res) {
    try {
        const heightWeight = await heightWeightRepository.insertHeightWeight(req.body)
        res.status(HttpStatusCode.INSERT_OK).json({
            message: "Insert height weight successfully", data: heightWeight
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Can not insert height weight : " + error.message,
            validationErrors: error.validationError
        });
    }
}

// async function updateHeightWeight(req, res) {
//     const {idUser} = req.params;
//     const{newData} = req.body;
//     try {
//         const updatedHeightWeight = await heightWeightRepository.updateHeightWeight(idUser, newData)
//         res.status(HttpStatusCode.OK).json({
//             message: 'update hight successfully',
//             data: updatedHeightWeight,
//         });
//     } catch (error) {
//         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
//             message : "Can not update height weight : " +  error.message, 
//         });
//     }
// }

async function updateHeightWeight(req, res) {
    const { idUser } = req.params;
    const { newData } = req.body;

    try {
        const updated = await heightWeightRepository.updateHeightWeight({ idUser, newData });

        res.status(HttpStatusCode.OK).json({
            message: 'Update height successfully',
            data: updated,
        });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
}

export default {
    getHeightWeightByIdUser,
    insertHeightWeight,
    updateHeightWeight
}
