const express = require('express')
const bcrypt = require('bcrypt')
const Student = require("../models/studentModel")

const router = express.Router()
/**
* TODO
* 1) Create GET endpoint to get first 50 students in student DB
* 2) GET /studentId to get specific student from student DB
* 3) POST Create student in DB
**/


router.route('/')
    .get(async (req, res, next) => {
        try {
            const students_list = await Student.find()
            res.status(200).json({ status: "success", results: students_list.length, data: { students_list } })

        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err
            });
        }
    })
    .post(async (req, res) => {
        try {
            const newStudent = await Student.create({ ...req.body })
            res.status(201).json({
                status: 'success',
                data: {
                    student: newStudent
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
            const student = await Student.findById("63a1776769ac3004a51f5be0")
            res.status(200).json({ status: "success", data: student })
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err
            });
        }

    })

module.exports = router