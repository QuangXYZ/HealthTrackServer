import express from 'express'
import {
    stepController
} from '../controllers/index.js'
const router = express.Router();

router.post('/', stepController.insertStep)
router.get('/:idUser/:date', stepController.getStep)
router.patch('/update/:idUser/:date', stepController.updateStep)

export default router;