import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { GoalsRepository } from '../repositories/index.js'

async function getGoals(req, res) {
    const idUser = req.params.idUser
    try {
        const goals = await GoalsRepository.getGoals(idUser)
        res.status(HttpStatusCode.OK).json({
            message: 'Get goals successfully',
            data: goals,
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
        })
    }
}

async function insertGoals(req, res) {
    try {
        const goals = await GoalsRepository.insertGoals(req.body)
        res.status(HttpStatusCode.INSERT_OK).json({
            message: "Insert goals successfully", data: goals
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Can not insert goals : " + error.message,
            validationErrors: error.validationError
        });
    }
}

async function updateGoals(req, res) {
    const { idUser } = req.params;
    const { newData } = req.body;

    try {
        const updated = await GoalsRepository.updateGoals({ idUser, newData });

        res.status(HttpStatusCode.OK).json({
            message: 'Update goals successfully',
            data: updated,
        });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
}

export default {
    insertGoals,
    getGoals,
    updateGoals
}