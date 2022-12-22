const mongoose = require('mongoose')

const classroomSchema = new mongoose.Schema(
    {
        classroomNumber: {
            type: String,
            required: [true, 'Classroom number is required'],
            unique: true
        },
        classroomTeacher: {
            type: String,
            required: [true, 'Classroom teacher is required']
        },
        subjectList: {
            type: [String],
            enum: ['Physics', 'Maths', 'Chemistry', 'PT', 'Computer', 'English'],
            validator: function (v) {
                return (v.length >= 1 && v.length <= 6)
            },
            message: "Subject List should be between 1 to 6"
        },
        studentsList: {
            type:[String],
            default: [],
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        }
    }
)
const classroom = mongoose.model('Classroom', classroomSchema)
module.exports = classroom