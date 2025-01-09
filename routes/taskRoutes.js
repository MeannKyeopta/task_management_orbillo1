const express = require("express");
const router = express.Router();

const { createTask,getAllTasks,getTaskByStatus,updateTask,deleteTask} = require("../controllers/taskController.js");

router.post("/",createTask);
router.get("/",getAllTasks);
router.get("/:status",getTaskByStatus);
router.put("/:id",updateTask);
router.delete("/:id",deleteTask);


module.exports = router;
