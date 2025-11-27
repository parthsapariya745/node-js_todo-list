const express = require("express")
const { handleGet, handlePost, handleUpdate, handleDelete, handleGetById, handleAllDelete } = require("../controller/todoController")

const router = express.Router()

router.get('/getAllData', handleGet)
router.get('/getIdData/:id', handleGetById)
router.post('/postData', handlePost)
router.put('/updateData/:id', handleUpdate)
router.delete('/deleteData/:id', handleDelete)
router.delete('/deleteAllData', handleAllDelete)

module.exports = router