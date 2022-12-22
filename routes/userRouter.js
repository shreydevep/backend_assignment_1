const express = require('express')
const bcrypt = require('bcrypt')
const User = require("../models/userModel")

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
            const users_list = await user.find()
            res.status(200).json({ status: "success", results: users_list.length, data: { users_list } })

        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err
            });
        }
    })
    .post(async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 5)
            const newUser = await User.create({ ...req.body, password: hashedPassword })
            res.status(201).json({
                status: 'success',
                data: {
                    user: newUser
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
            const user = await User.find().where("userId").equals(req.params.id)
            res.status(200).json({ status: "success", data: user })
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: err
            });
        }

    })

module.exports = router