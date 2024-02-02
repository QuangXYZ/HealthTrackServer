import express from 'express';
import { body, validationResult } from 'express-validator';
import {
    userController
} from '../controllers/index.js'

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get user');
});
router.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 5 }), 
    userController.login
    );
router.post('/register', userController.register );

router.get('/:id', userController.getDetailUser );
export default router;