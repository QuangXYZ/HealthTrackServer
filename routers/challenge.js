import express from 'express';
import { body, validationResult } from 'express-validator';
import {
    challengeController
} from '../controllers/index.js'

const router = express.Router();

router.get('/', challengeController.getAllChallenges);

router.get('/:id', challengeController.getChallengeById);

router.post('/create', challengeController.create );

router.post('/invite', challengeController.inviteUser );

router.post('/delete', challengeController.delete );

export default router;