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
    try {
        let user = await userRepository.login({email, password})
        res.status(HttpStatusCode.OK).json({message: "Login successfully", data : user});
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({message : error.message});
    }
    
    
}

const register = async (req, res) => { 
    const {email,password, name} = req.body
    myEvent.emit('event.register.user', req.body)
    try {
        debugger
        const user = await userRepository.register({
            email,password, name
        }) 
        res.status(HttpStatusCode.INSERT_OK).json({message : 'Post register user', data : user});
    } catch (error) {
        debugger
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({message : error.message});
    }

}


const getDetailUser = async (req, res) => {
    res.send('Post register user');
}


const joinChallenge = async (req, res) => { 
    const {userId, userName, idChallenge} = req.body
    try {
        debugger
        const challenge = await userRepository.joinChallenge({userId, userName, idChallenge}) 
        res.status(HttpStatusCode.INSERT_OK).json({message : 'Join challenge successfully ', data : challenge});
    } catch (error) {
        debugger
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({message : error.message});
    }

}

const leaveChallenge = async (req, res) => { 
    const {userId, idChallenge} = req.body
    try {
        const challenge = await userRepository.leaveChallenge({userId, idChallenge}) 
        res.status(HttpStatusCode.INSERT_OK).json({message : 'Leave challenge successfully ', data : challenge});
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({message : error.message});
    }

}

const updateUser = async (req, res) => {
    const { id, email, password, name, gender, badges, friends, dateOfBirth, healthActivity, idChallenges } = req.body;
    try {
        const updatedUser = await userRepository.updateUser({id, email, password, name, gender, badges, friends, dateOfBirth, healthActivity, idChallenges });
        res.status(HttpStatusCode.INSERT_OK).json({ message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

const uploadProfilePicture= async(req, res) =>{
    try {
        debugger
        const { userId } = req.body;
        const imageData = req.file.buffer;
        const contentType = req.file.mimetype;
        await userRepository.uploadProfilePicture({userId, imageData, contentType});
        res.json({ message: 'Profile picture uploaded successfully!' });
    } catch (error) {
        res.status(500).send(error.message);
    }
}


const addFriend = async (req, res) => { 
    const {userId, friendId} = req.body
    try {
        debugger
        const challenge = await userRepository.addFriend({userId,friendId}) 
        res.status(HttpStatusCode.INSERT_OK).json({message : 'Join challenge successfully ', data : challenge});
    } catch (error) {
        debugger
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({message : error.message});
    }

}
export default {
    login,
    register,
    getDetailUser ,
    joinChallenge ,
    leaveChallenge,
    updateUser,
    uploadProfilePicture,
    addFriend
}