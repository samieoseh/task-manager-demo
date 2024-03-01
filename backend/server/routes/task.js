import express from "express";
import {getTasks, addTask, deleteTask, updateTask} from "../controller/task.js"

const router = express.Router();


router.get('/:id', getTasks);
router.post('/', addTask);
router.delete('/:id', deleteTask);
router.patch('/:id', updateTask);


export default router;