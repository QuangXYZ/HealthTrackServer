import Exception from "../exceptions/Exception.js"
import {Challenge, User} from '../models/index.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const login = async ({email,password}) => { 
        // debugger
        const existingUser = await User.findOne({email}).exec()
        if (!!existingUser) { 
            // debugger
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
    email, password, name
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
            name, email, password: hashedPassword
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

const leaveChallenge = async ({userId,idChallenge}) => { 
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('Người dùng không tồn tại');
        }
        // Xóa idChallenge khỏi mảng idChallenges
        const index = user.idChallenges.indexOf(idChallenge);
        if (index !== -1) {
            user.idChallenges.splice(index, 1);
        }
        await user.save();

        // Tìm và cập nhật thách thức
        const challenge = await Challenge.findById(idChallenge);
        if (!challenge) {
            throw new Error('Thách thức không tồn tại');
        }
        // Lọc ra listMember để loại bỏ người dùng khỏi đó
        challenge.listMember = challenge.listMember.filter(member => member.userId !== userId);
        await challenge.save();

    return challenge
        
    } catch (error) {
        // check model validation   
        debugger
        throw new Exception("Can not join challenge")
        
    }

    
}

const updateUser = async ({id, password, name, gender, badges, friends, dateOfBirth, healthActivity, idChallenges,level,exp}) => {
    const user = await User.findById(id)
    user.name = name ?? user.name
    user.password = password ?? user.password
    user.gender = gender ?? user.gender
    user.badges = badges ?? user.badges
    user.friends = friends ?? user.friends
    user.dateOfBirth = dateOfBirth ?? user.dateOfBirth
    user.healthActivity = healthActivity ?? user.healthActivity
    user.idChallenges = idChallenges ?? user.idChallenges
    user.level = level ?? user.level
    user.exp = exp ?? user.exp

    await user.save()
    return user
}
const addFriend = async ({userId, friendId}) => {
    const user = await User.findById(userId)
    const friend = await User.findById(friendId)
    if (!friend || !user ) throw new Error('Người dùng không tồn tại');

    user.friendMyRequest.push(friendId);
    friend.friendRequest.push(userId);

    await user.save()
    await friend.save()
    return user
}

const uploadProfilePicture = async ({ userId, imageData, contentType }) => {
    try {
        debugger
        const user = await User.findById(userId);
        user.profilePicture.data = imageData;
        user.profilePicture.contentType = contentType;
        await user.save();
        return user;
    } catch (error) {
        debugger
        throw new Exception("Failed to upload profile picture");
    }
};

export default {
    login,
    register,
    joinChallenge,
    leaveChallenge,
    updateUser,
    uploadProfilePicture,
    addFriend
}