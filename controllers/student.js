import { body, validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
async function getAllStudent(req, res) {
    res.status(HttpStatusCode.OK).json({
        message: 'Get all students successfully',
        data: [{
            name: 'Nguyen Van A',
            email: 'A@gmail.com',
            age: 34

        }, {
            name: 'Nguyen Van B',
            email: 'B@gmail.com',
            age: 34

        }, {
            name: 'Nguyen Van C',
            email: 'C@gmail.com',
            age: 34

        }]
    })
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: "Can not get students"
    })
}
async function getStudentById(req, res) {

}
async function updateStudent(req, res) {

}
async function insertStudent(req, res) {
    

}
export default {
    getAllStudent,
    getStudentById,
    updateStudent,
    insertStudent
}