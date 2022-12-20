const express = require('express')

const router = express.Router()
/**
* TODO
* 1) Create GET endpoint to get first 50 students in student DB
* 2) GET /studentId to get specific student from student DB
* 3) POST Create student in DB
**/
const newStudent = {
    student_name: "Test_student_1",
    student_id: "stu_0",
    student_dob: "20/01/2000"
}

router.route('/')
    .get((req, res, next) => {
        const students_list = Array.from(Array(10), () => (newStudent))
        res.status(200).json({ status: "success", results: students_list.length, data: { students_list } })
    })
    .post((req, res) => {

        res.status(201).json({
            status: 'success',
            data: {
                student: newStudent
            }
        })
    })

router
    .route('/:id')
    .get((req, res, next) => {
        res.status(200).json({ status: "success", data: newStudent })
    })

module.exports = router