const express = require('express')
const bcrypt = require('bcrypt')
const Classroom = require("../models/classroomModel")
const Student = require("../models/studentModel")
const router = express.Router()



router.route('/')
    .get(async (req, res, next) => {
        try {
            const classrooms_list = await Classroom.find()
            res.status(200).json({ status: "success", results: classrooms_list.length, data: { classrooms_list } })

        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err
            });
        }
    })
    .post(async (req, res, next) => {
        console.log({ ...req.body })
        try {
            const newClassroom = await Classroom.create({ ...req.body })

            res.status(201).json({
                status: 'success',
                data: {
                    classroom: newClassroom
                }
            })
        }
        catch (err) {
            res.status(400).json({
                status: 'fail',
                message: err
            });
        }
    })

router
    .route('/:id')
    .get(async (req, res, next) => {
        try {
            const classroom = await Classroom.find().where('classroomNumber').equals(req.params.id)
            res.status(200).json({ status: "success", data: classroom })
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err
            });
        }

    })
    .patch(async (req, res, next) => {
        try {
            const studentsList = req.body.studentsList
            let student_id_list = []

            studentsList.forEach(async element => {
                const { student_id, student_rollno, student_marks } = element
                student_id_list.push(student_id)
                let subject_list = [...Object.keys(element.student_marks)]
                await Student.findOneAndUpdate({ student_id: student_id }, { "marks": student_marks })
                await Student.findOneAndUpdate({ student_id: student_id }, { "subjects": subject_list })
            });


            console.log(student_id_list)
            const classroom = await Classroom.findOneAndUpdate({ classroomNumber: req.params.id }, { "$push": { "studentsList": { $each: student_id_list } } }, {
                new: true,
                runValidators: true,
            })


            res.status(200).json({ status: "success", data: classroom })
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err
            });
        }
    })

module.exports = router