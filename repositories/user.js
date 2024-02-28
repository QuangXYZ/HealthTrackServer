import Exception from "../exceptions/Exception.js"
import {Challenge, User} from '../models/index.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const login = async ({email,password}) => { 
        debugger
        const existingUser = await User.findOne({email}).exec()
        if (!!existingUser) { 
            debugger
            let isMatch = await bcrypt.compare(password,existingUser.password)
            if (!!isMatch) {
                // Create java web token
                let token = jwt.sign(
                    {
                        data: existingUser
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "7 days",
                    })
                    return {...existingUser.toObject(),
                            password : "not show",
                            token: token
                        }
            }
            else {
                throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD)
            }

        } else {
            throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD)
        }
        
        
    
}
const register = async ({
    email, password, name, gender, badges, friends, dateOfBirth, healthActivity, idChallenges
    }) => { 
    try {
        debugger
        const existingUser = await User.findOne({email}).exec()
        if (!!existingUser) { 
            throw new Exception("User already exists")
        }
        // encrypt password with salt rounds
        const hashedPassword = await bcrypt.hash(password,parseInt(process.env.SALT_ROUNDS))
        const newUser = await User.create({
            name, email, password: hashedPassword, gender, badges, friends, dateOfBirth, healthActivity, idChallenges
        })
        return {...newUser._doc,password: 'Not show'}
    } catch (error) {
        // check model validation
        
        throw new Exception(Exception.CANNOT_REGISTER_USER)
        
    }
    
}

const joinChallenge = async ({userId, userName,idChallenge}) => { 
    try {
        debugger
        const user = await User.findById(userId)
        user.idChallenges.push(idChallenge)
        const challenge = await Challenge.findById(idChallenge)
        challenge.listMember.push({userId, userName, accept : true})
        challenge.userRecords.push({userId, userName})
        await user.save()
        await challenge.save()

    return challenge
        
    } catch (error) {
        // check model validation   
        debugger
        throw new Exception("Can not join challenge")
        
    }
    
}

const leaveChallenge = async ({userId, userName,idChallenge}) => { 
    try {
        debugger
        const user = await User.findById(userId)
        user.idChallenges.push(idChallenge)
        const challenge = await Challenge.findById(idChallenge)
        challenge.listMember.push({userId, userName, accept : true})
        challenge.userRecords.push({userId, userName})
        await user.save()
        await challenge.save()

    return challenge
        
    } catch (error) {
        // check model validation   
        debugger
        throw new Exception("Can not join challenge")
        
    }
    
}


export default {
    login,
    register,
    joinChallenge,
    leaveChallenge
}