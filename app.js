const express = require("express")
const morgan = require("morgan")

const studentRouter = require('./routes/studentRouter')
const app = express()

const port = 3000

//Middlewares
app.use(express.json())
app.use(morgan('dev'))

app.get("/", (req, res) => {
    res.status(200).json({ message: 'Root Endpoint of the Express App' })
})
//Routes

app.use('/api/v1/students',studentRouter);

app.listen(port, () => {
    console.log(`Application running on Port ${port}`)
})

module.exports = app