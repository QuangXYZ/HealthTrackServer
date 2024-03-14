import express from 'express';
import {
    heightWeightController
} from '../controllers/index.js'
const router = express.Router();

router.get('/:idUser', heightWeightController.getHeightWeightByIdUser);
router.post('/', heightWeightController.insertHeightWeight);
router.patch('/update/:idUser', heightWeightController.updateHeightWeight);

export default router;