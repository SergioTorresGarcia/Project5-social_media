import { Router } from "express";
import { deleteUserById, getUserById, getUsers, updateUserById } from "../controllers/user.controller.js";


const router = Router();


router.get('/', getUsers)
router.get('/:id', getUserById)
router.put('/:id', updateUserById)
router.delete('/:id', deleteUserById)

export default router;