import { body, validationResult } from 'express-validator';
import {userRepository} from '../repositories/index.js'
const login = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const {email, password} = req.body;
    await userRepository.login({email, password})
    res.status(200).json({ data :'User data is here'});
}

const register = async (req, res) => {
    const {email,password, name, phoneNumber, address} = req.body
    await userRepository.register({email,password, name, phoneNumber, address})
    res.send('Post register user');
}


const getDetailUser = async (req, res) => {
    res.send('Post register user');
}



export default {
    login,
    register,
    getDetailUser   
}