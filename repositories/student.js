import Exception from "../exceptions/Exception.js"
import { Student } from "../models/index.js"

const getAllStudent = async ({page, size, searchString}) => {
    page = parseInt(page)
    size = parseInt(size)
    let filteredStudent = await Student.aggregate([
        {
            $match : {
                $or : [
                    {
                        name : {$regex : `.*${searchString}.*`, $options : "i"}
                    }
                ]
            }
        },
        {
            $skip : (page - 1) * size
        },
        {
            $limit : size
        }      
    ])
    
    return filteredStudent
}

const getStudentById = async ({id}) => {
    let student = await Student.findById(id)
    return student ?? {}
}

const insertStudent = async ({name, email, languages, gender, phoneNumber, address}) => {
    try {
        const student = await Student.create({name, email, languages, gender, phoneNumber, address})
        return student
    } catch (error) {
        if (!!error.errors) throw new Exception("Input error", error.errors)
    }
    
}

const updateStudent = async ({id, name, email, languages, gender, phoneNumber, address}) => {
    const student = await Student.findById(id)
    student.name = name ?? student.name
    student.email = email ?? student.email
    student.languages = languages ?? student.languages
    student.gender = gender ?? student.gender
    student.phoneNumber = phoneNumber ?? student.phoneNumber
    student.address = address ?? student.address
    await student.save()
    return student
}

export default {
    getAllStudent,
    insertStudent,
    getStudentById,
    updateStudent
}


