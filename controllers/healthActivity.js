import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { HealthActivityRepository } from '../repositories/index.js';


async function insertHealthActivity(req, res) {
    try {
        const healthActivity = await HealthActivityRepository.insertHealthActivity(req.body)
        res.status(HttpStatusCode.INSERT_OK).json({
            message: 'Insert HealthActivity successfully',
            data: healthActivity
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SEVER_ERROR).json({
            message: 'Cannot insert HealthActivity: ' + exception,
            validationErrors: exception.validationErrors
        })
    }
}

async function getDataHealth(req, res) {
    try {
        let idUser = req.params.idUser
        // let id = req.params.id
        let date = req.params.date

        let filteredHealthActivity = await HealthActivityRepository.getDataHealth(idUser, date)

        res.status(HttpStatusCode.OK).json({
            message: 'get health activity by params successfully',
            data: filteredHealthActivity,
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
        })
    }
}

async function updateHealthActivityController(req, res) {
    const { idUser, date } = req.params;
    const { newData } = req.body;

    try {
        const updatedHealthActivity = await HealthActivityRepository.updateHealthActivity({ idUser, date, newData });

        res.status(HttpStatusCode.OK).json({
            message: 'Update health activity successfully',
            data: updatedHealthActivity,
        });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
}

async function addAmountWaterTime(req, res) {
    try {
        const { idUser, date } = req.params;
        const amountWaterTime = req.body;

        const result = await HealthActivityRepository.addAmountWaterTime(idUser, date, amountWaterTime);

        res.status(200).json({
            message: 'Add AmountWaterTime successfully',
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message,
        });
    }
}

const deleteAmountWaterTime = async (req, res) => {
    const { idUser, date, amountWaterTimeId } = req.params;
  
    try {
      const updatedHealthActivity = await HealthActivityRepository.deleteAmountWaterTime(idUser, date, amountWaterTimeId);
  
      res.status(HttpStatusCode.OK).json({
        message: 'Update health activity successfully',
        data: updatedHealthActivity,
    });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
  };

export default {
    insertHealthActivity,
    getDataHealth,
    updateHealthActivityController,
    addAmountWaterTime,
    deleteAmountWaterTime
}