import express from 'express';
import { 
    healthCyclesController 
} from '../controllers/index.js'
const router = express.Router();

router.post('/add', healthCyclesController.insertHealthCycle);
router.patch('/update/:idUser/:menstrualCycleStart', healthCyclesController.updateHealthCycleController)
export default router;
