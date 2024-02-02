import { body, validationResult } from 'express-validator';
import {userRepository} from '../repositories/index.js'
import {EventEmitter} from 'node:events'
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
const myEvent = new EventEmitter()
myEvent.on('event.register.user', (params) => {
 console.log('They talk about param :'+ JSON.stringify(params))
})

const login = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: error.array() });
    }
    const {email, password} = req.body;
    await userRepository.login({email, password})
    res.status(HttpStatusCode.OK).json({ data :'User data is here'});
}

const register = async (req, res) => {
    const {email,password, name, phoneNumber, address} = req.body
    await userRepository.register({email,password, name, phoneNumber, address})

    myEvent.emit('event.register.user', req.body)
    res.status(HttpStatusCode.INSERT_OK).json('Post register user'+ email+password+name+phoneNumber+address);
}


const getDetailUser = async (req, res) => {
    res.send('Post register user');
}



export default {
    login,
    register,
    getDetailUser   
}