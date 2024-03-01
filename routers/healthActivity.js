import express from 'express';
import { 
    healthActivityController 
} from '../controllers/index.js'
const router = express.Router();

router.post('/', healthActivityController.insertHealthActivity)
router.get('/:idUser/:date', healthActivityController.getDataHealth)
router.patch('/update/:idUser/:date', healthActivityController.updateHealthActivityController);
router.post('/addAmountWaterTime/:idUser/:date', healthActivityController.addAmountWaterTime);
router.delete('/deleteAmountWaterTime/:idUser/:date/:amountWaterTimeId', healthActivityController.deleteAmountWaterTime);
export default router;
