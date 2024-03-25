import challenge from "../controllers/challenge.js"
import Exception from "../exceptions/Exception.js"
import { Challenge } from "../models/index.js"

const getAllChallengesByUser = async ({idUser}) => {
    let filteredChallenge = await Challenge.aggregate([
        {
            $match : {
                $or : [
                    {
                        "listMember.userId" : {$regex : `.*${idUser}.*`, $options : "i"}
                    }
                ]
            }
        },    
    ])
    
    return filteredChallenge
}
const getPublicChallenge = async () => {
    let filteredChallenge = await Challenge.aggregate([
        {
            $match : {
                $or : [
                    {
                        "access" : {$regex : `.*${"Public"}.*`, $options : "i"}
                    }
                ]
            }
        },    
    ])
    
    return filteredChallenge
}

const getChallengeById = async ({id}) => {
    let challenge = await Challenge.findById(id)
 
    if (!challenge) {
        return null
    }
    else return { 
        ...challenge._doc,
        listMember: [{}],
        userRecords: [{}]
    } 
}

const createChallenge = async ({name, dateStart,dateEnd,description, target, listMember, userRecords, access,exp}) => {
    try {
        debugger
        const challenge = await Challenge.create({name, dateStart,dateEnd,description, target, listMember, userRecords, access,exp})
        return challenge
    } catch (error) {
        debugger
        if (!!error.errors) throw new Exception("Input error", error.errors)
    }
    
}


const deleteChallenge = async({id}) => {
    try {
        const challenge = await Challenge.findByIdAndDelete(id)
        return challenge
    } catch (error) {
        if (!!error.errors) throw new Exception("Can not delete challenge", error.errors)
    }
    
}

const updateChallenge = async ({id ,name,  dateEnd, target, listMember, userRecords}) => {
    const challenge = await Challenge.findById(id)
    challenge.name = name ?? challenge.name
    challenge.dateEnd = dateEnd ?? challenge.dateEnd
    challenge.target = target ?? challenge.target
    challenge.listMember = listMember ?? challenge.listMember
    challenge.userRecords = userRecords ?? challenge.userRecords
    await challenge.save()
    return challenge
}

export default {
    getAllChallengesByUser,
    getChallengeById,
    createChallenge,
    getPublicChallenge,
    updateChallenge,
    deleteChallenge
}


