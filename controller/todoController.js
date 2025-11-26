const { Todo } = require("../models/todoModel")

exports.handleGet = async (req, res) => {
    const allTodoData = await Todo.find()
    res.status(200).json({ success: true, allTodoData })
}

exports.handleGetById = async (req, res) => {
    try {
        const id = req.params.id

        const todoData = await Todo.findById(id)
        if (!todoData) {
            return res.status(404).json({ success: false, message: "Task not found" })
        }

        res.status(200).json({ success: true, todoData })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error });
    }
}

exports.handlePost = async (req, res) => {
    try {
        const { task } = req.body
        if (!task) {
            return res.status(404).json({ success: false, message: "Please enter your task" })
        }

        const existingTask = await Todo.findOne({ task })
        if (existingTask) {
            return res.status(404).json({ success: false, message: "Task already added" })
        }

        const todoData = await Todo.create({ task })
        
        res.status(200).json({ success: true, message: "Task added Successfully", todoData })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error });
    }
}

exports.handleUpdate = async (req, res) => {
    try {
        const { task } = req.body
        if (!task) {
            return res.status(404).json({ success: false, message: "Please enter your task" })
        }
    
        const id = req.params.id
    
        const todoData = await Todo.findByIdAndUpdate(id, { task }, {
            new: true,
            runValidators: true
        })
        if (!todoData) {
            return res.status(404).json({ success: false, message: "Task not found" })
        }
    
        res.status(200).json({ success: true, message: "Task updated Successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error });
    }
}

exports.handleDelete = async (req, res) => {
    try {
        const id = req.params.id

        const todoData = await Todo.findByIdAndDelete(id)
        if (!todoData) {
            return res.status(404).json({ success: false, message: "Task not found" })
        }

        res.status(200).json({ success: true, message: "Task deleted Successfully", todoData })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error });
    }
}