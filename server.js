const express = require("express")
const dotenv = require("dotenv")
const { connectDB } = require("./config/db")
const router = require("./routes/todoRoute")
const cors = require("cors")

dotenv.config()

const app = express()
app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/app/todos", router)

connectDB()

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})