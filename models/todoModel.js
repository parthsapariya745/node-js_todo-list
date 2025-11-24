const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, "*Please Enter you task"]
    }
})

module.exports.Todo = mongoose.model("Todo", todoSchema)