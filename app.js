const express = require("express")
const morgan = require("morgan")

const userRouter = require("./routes/userRouter")
const studentRouter = require('./routes/studentRouter')
const classroomRouter = require("./routes/classroomRouter")
const customRouter = require("./routes/customRouter")
const app = express()

const port = 3000

//Middlewares
app.use(express.json())
app.use(morgan('dev'))

app.get("/", (req, res) => {
    res.status(200).json({ message: 'Root Endpoint of the Express App' })
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

//Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/classrooms', classroomRouter);
app.use('/api/v1/custom',customRouter);


module.exports = app