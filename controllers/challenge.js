import { body, validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import {challengeRepository} from '../repositories/index.js';
import Exception from '../exceptions/Exception.js';
import { MAX_RECORDS } from '../global/constants.js';
async function getAllChallengesByUser(req, res) {
    try {
        let idUser = req.params.idUser
        let filteredChallenges = await challengeRepository.getAllChallengesByUser({idUser})
        res.status(HttpStatusCode.OK).json({
            message : 'Get all challenge successfully',
            size : filteredChallenges.length,
            data : filteredChallenges
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message : error.message,
        })
    }
}

async function getPublicChallenge(req, res) {
    try {
        let filteredChallenges = await challengeRepository.getPublicChallenge({})
        res.status(HttpStatusCode.OK).json({
            message : 'Get all challenge public successfully',
            data : filteredChallenges
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message : error.message,
        })
    }
}
async function getChallengeById(req, res) {
    try {
        let id = req.params.idChallenge
        let challenge = await challengeRepository.getChallengeById({id})
        if (!challenge) {
            throw new Exception('Can not find challenge with id ' + id)
        }
        res.status(HttpStatusCode.OK).json({
            message : 'Get challenge successfully',
            data : challenge
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message : error.message,
        })
    }
}
async function createChallenge(req, res) {
    try {
        let challenge = await challengeRepository.createChallenge(req.body)
        res.status(HttpStatusCode.OK).json({
            message : 'Create challenge successfully',
            data : challenge
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message : error.message,
        })
    }
}
async function deleteChallenge(req, res) {
    try {
        let id = req.params.id
        const challenge = await challengeRepository.deleteChallenge({id})
        res.status(HttpStatusCode.INSERT_OK).json(
            {message : "Delete challenge successfully", data : challenge});
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message : "Can not delete challenge : " +  error.message, 

        });
       
    }
}

async function updateChallenge(req, res) {
    try {
        const challenge = await challengeRepository.updateChallenge(req.body)
        res.status(HttpStatusCode.INSERT_OK).json(
            {message : "Update challenge successfully", data : challenge});
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message : "Can not update challenge : " +  error.message, 
        });
        
    }}
export default {
    getAllChallengesByUser,
    getChallengeById,
    getPublicChallenge,
    createChallenge,
    deleteChallenge,
    updateChallenge,
}