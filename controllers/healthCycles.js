import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { HealthCycleRepository } from '../repositories/index.js';

async function insertHealthCycle(req, res) {
    try {
        const healthActivity = await HealthCycleRepository.insertHealthCycle(req.body)
        res.status(HttpStatusCode.INSERT_OK).json({
            message: 'Insert HealthCycle successfully',
            data: healthActivity
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert HealthCycle: ' + exception,
            validationErrors: exception.validationErrors
        })
    }
}

async function updateHealthCycleController(req, res) {
    const { idUser, menstrualCycleStart } = req.params;
    const { newData } = req.body;

    try {
        const updatedHealthCycle = await HealthCycleRepository.updateHealthCycle({idUser, menstrualCycleStart, cycleLength, newData});
        res.status(HttpStatusCode.OK).json({
            message: 'Update health cycle successfully',
            data: updatedHealthCycle,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
        })
    }
}

export default {
    insertHealthCycle,
    updateHealthCycleController,
}