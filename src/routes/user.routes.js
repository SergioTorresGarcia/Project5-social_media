import { Router } from "express";
import { deleteUserById, getUserProfile, getUsers, updateUserProfile, updateUserRole } from "../controllers/user.controller.js";

import { auth } from "../middlewares/auth.js";
import { isSuperAdmin } from "../middlewares/isSuperAdmin.js";


const router = Router();


router.get('/', auth, isSuperAdmin, getUsers) // '/?email=ejemplo@mail.com' (EXTRA)
router.get('/profile', auth, getUserProfile)
router.put('/profile', auth, updateUserProfile)
router.delete('/:id', auth, isSuperAdmin, deleteUserById) // (EXTRA)
router.put('/:id/role', auth, isSuperAdmin, updateUserRole) // (EXTRA)

export default router;