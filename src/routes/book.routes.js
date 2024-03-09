import { Router } from "express";
import { createBook, deleteBookById, getBookById, getBooks, udpateBookById } from "../controllers/book.controller.js"

const router = Router();

router.post('/', createBook)
router.get('/', getBooks)
router.get('/:id', getBookById)
router.put('/:id', udpateBookById)
router.delete('/:id', deleteBookById)


export default router;