require("dotenv").config()

const express = require("express")
const cors = require("cors")

const connectDB = require("./config/db")
const studentRoutes = require("./routes/studentRoutes")

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use("/students", studentRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})