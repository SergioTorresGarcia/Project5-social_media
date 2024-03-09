import Book from "../models/Book.js"


export const createBook = async (req, res) => {
    try {
        const { title, description, author } = req.body
        // const title = req.body.title

        if (!title || !description || !author) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Title description and author required"
                }
            )
        }

        const newBook = await Book.create(
            {
                // title: title
                title,
                description,
                author
            }
        )

        res.status(201).json(
            {
                success: true,
                message: "Book created",
                data: newBook
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Book cannot be created",
                error: error.message
            }
        )
    }
}


export const getBooks = async (req, res) => {
    try {
        const page = req.query.page || 1
        const limit = 5
        const books = await Book.find()
        const booksDisplay = await Book.find().select('title').skip((Number(page) - 1) * limit).limit(limit)

        res.status(200).json(
            {
                success: true,
                message: `Total of ${books.length} books found.`,
                data: booksDisplay
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Book cannot be retrieved",
                error: error.message
            }
        )
    }
}


export const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id
        const book = await Book.findById(bookId).select('title').select('author');

        res.status(200).json(
            {
                success: true,
                message: "Book retrieved",
                data: book
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Book cannot be retrieved",
                error: error.message
            }
        )
    }
}


export const udpateBookById = async (req, res) => {
    try {
        const updateData = req.body

        const bookId = req.params.id

        if (!updateData) {
            return res.status(400).json(
                {
                    success: true,
                    message: "No changes detected. Book cannot be updated",
                }
            )
        }

        const bookUpdated = await Book.findByIdAndUpdate(bookId, updateData, { new: true })

        res.status(200).json(
            {
                success: true,
                message: "Book updated successfully",
                data: bookUpdated
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Book cannot be retrieved",
                error: error.message
            }
        )
    }
}


export const deleteBookById = async (req, res) => {
    try {
        const bookId = req.params.id

        const bookDeleted = await Book.findOneAndDelete(bookId)

        res.status(200).json(
            {
                success: true,
                message: "Book deleted successfully",
                data: bookDeleted
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Book cannot be deleted",
                error: error.message
            }
        )
    }
} 