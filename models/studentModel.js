const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema(
    {
        student_id: {
            type: String,
            required: [true, 'A student needs to have a student ID'],
            unique: true
        },
        student_name: {
            type: String,
            required: [true, 'A student must have a name'],
            minlength: [3, 'A student name must have more or equal then 3 characters']
        },
        student_dob: {
            type: Date,
            required: [true, 'A student must have a date of birth'],
            default: Date.now()
        },
        subjects: {
            type: [String],
            enum: ['Physics', 'Maths', 'Chemistry', 'PT', 'Computer', 'English'],
            default: [],
            validator: function (v) {
                return (v.length >= 1 && v.length <= 6)
            },
            message: "Subject List should be between 1 to 6"
        },
        marks: {
            type: Object,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
    }
)
const Student = mongoose.model('Student', studentSchema)
module.exports = Student