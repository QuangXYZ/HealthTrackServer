import { body, validationResult } from 'express-validator';

async function getAllStudent(req, res) {
    res.status(200).json({
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