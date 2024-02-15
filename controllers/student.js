import { body, validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import {studentRepository} from '../repositories/index.js';
import Exception from '../exceptions/Exception.js';
import { MAX_RECORDS } from '../global/constants.js';
async function getAllStudent(req, res) {
    let {page = 1, size = MAX_RECORDS, searchString = ''} = req.query
    size = size >= MAX_RECORDS ? MAX_RECORDS :size
    try {
        let filteredStudent = await studentRepository.getAllStudent({page, size, searchString})
        res.status(HttpStatusCode.OK).json({
            message : 'Get all students successfully',
            page,
            searchString,
            size : filteredStudent.length,
            data : filteredStudent
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message : error.message,
        })
    }
  

}
async function getStudentById(req, res) {
    try {
        let id = req.params.id
        let student = await studentRepository.getStudentById({id})
        if (!student) {
            throw new Exception('Can not find student with id ' + id)
        }
        res.status(HttpStatusCode.OK).json({
            message : 'Get student successfully',
            data : student
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message : error.message,
        })
    }
}
async function updateStudent(req, res) {
    try {
        let student = await studentRepository.updateStudent(req.body)
        res.status(HttpStatusCode.OK).json({
            message : 'Update student successfully',
            data : student
        })
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message : error.message,
        })
    }
}
async function insertStudent(req, res) {
    try {
        const student = await studentRepository.insertStudent(req.body)
        res.status(HttpStatusCode.INSERT_OK).json(
            {message : "Insert student successfully", data : student});
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message : "Can not insert student : " +  error.message, 
            validationErrors : error.validationError
        });
        
    }

}
export default {
    getAllStudent,
    getStudentById,
    updateStudent,
    insertStudent
}