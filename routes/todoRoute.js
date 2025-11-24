const express = require("express")
const { handleGet, handlePost, handleUpdate, handleDelete, handleGetById } = require("../controller/todoController")

const router = express.Router()

router.get('/getAllData', handleGet)
router.get('/getIdData/:id', handleGetById)
router.post('/postData', handlePost)
router.put('/updateData/:id', handleUpdate)
router.delete('/deleteData/:id', handleDelete)

module.exports = router