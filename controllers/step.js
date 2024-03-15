import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { StepRepository } from '../repositories/index.js'

async function insertStep(req, res) {
    try {
        const step = await StepRepository.insertStep(req.body)
        res.status(HttpStatusCode.INSERT_OK).json({
            message: 'Insert Step successfully',
            data: step
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert step: ' + exception,
            validationErrors: exception.validationErrors
        })
    }
}

async function getStep(req, res) {
    try {
        let idUser = req.params.idUser
        let date = req.params.date

        let filteredStep = await StepRepository.getStep(idUser, date)

        res.status(HttpStatusCode.OK).json({
            message: 'get step by params successfully',
            data: filteredStep,
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
        })
    }
}

async function updateStep(req, res) {
    const { idUser, date } = req.params;
    const { newData } = req.body;

    try {
        const updatedStep = await StepRepository.updateStep({ idUser, date, newData });

        res.status(HttpStatusCode.OK).json({
            message: 'Update  step successfully',
            data: updatedStep,
        });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
}

export default {
    insertStep,
    getStep,
    updateStep
}