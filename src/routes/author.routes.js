import { Router } from "express";
import { createAuthor, deleteAuthorById, getAuthorById, getAuthors, udpateAuthorById } from "../controllers/author.controller.js";


const router = Router();


router.post('/', createAuthor)
router.get('/', getAuthors)
router.get('/:id', getAuthorById)
router.put('/:id', udpateAuthorById)
router.delete('/:id', deleteAuthorById)

export default router;