import express from 'express';

import {
    goalsController
} from '../controllers/index.js'
const router = express.Router();

router.get('/:idUser', goalsController.getGoals);
router.post('/', goalsController.insertGoals);
router.patch('/update/:idUser', goalsController.updateGoals);

export default router;