const express = require('express')
const bcrypt = require('bcrypt')
const User = require("../models/userModel")
const Student = require("../models/studentModel")
const Classroom = require("../models/classroomModel")

const router = express.Router()


router.route('/')
    .get(async (req, res, next) => {

        try {
            const { classNumber, subject } = req.query
            const classroom = await Classroom.findOne({ classroomNumber: classNumber })
            let finalList = []
            classroom["studentsList"].forEach(async student_id => {
                const student = await Student.findOne({ student_id: student_id })

                for (const key in student['marks']) {
                    if (key === subject) {
                        finalList.push(student)
                    }
                }
            })
            
            setTimeout(() => {
                res.status(200).json({ status: "success", data: finalList })
            }, 5000)


        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err
            });
        }
    })

module.exports = router