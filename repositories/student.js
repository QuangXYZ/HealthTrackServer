import { Student } from "../models"

const getAllStudent = async ({page, size, searchString}) => {
    console.log('Get all student')
}

const insertStudent = async ({name, email, languages, gender, phoneNumber, address}) => {
    const student = await Student.create({name, email, languages, gender, phoneNumber, address})
}

export default {
    getAllStudent,
    insertStudent
}


