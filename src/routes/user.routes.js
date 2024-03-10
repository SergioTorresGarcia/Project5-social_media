import { Router } from "express";
import { deleteUserById, getUserProfile, getUsers, updateUserProfile, updateUserRole } from "../controllers/user.controller.js";
import { getPostByUserId } from "../controllers/post.controller.js";

import { auth } from "../middlewares/auth.js";
import { isSuperAdmin } from "../middlewares/isSuperAdmin.js";


const router = Router();


router.get('/', auth, isSuperAdmin, getUsers)               // OK - (EXTRA) there is query search, but it is not dynamic 
router.get('/profile', auth, getUserProfile)                // OK
router.put('/profile', auth, updateUserProfile)             // OK
router.delete('/:id', auth, isSuperAdmin, deleteUserById)   // OK - (EXTRA)
router.put('/:id/role', auth, isSuperAdmin, updateUserRole) // OK - (EXTRA)
router.get('/posts/:userId', auth, getPostByUserId)         // OK - Retrieving posts of a specific user


export default router;