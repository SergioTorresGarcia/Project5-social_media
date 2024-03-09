import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import bookRoutes from "./book.routes.js"
import authorRoutes from "./author.routes.js"

const router = Router();

router.use('/auth', authRoutes)
router.use('/books', bookRoutes)
router.use('/users', userRoutes)
router.use('/authors', authorRoutes)

export default router;