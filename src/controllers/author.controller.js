import Author from "../models/Author.js"


export const createAuthor = async (req, res) => {
    try {
        const { name, nationality } = req.body

        if (!name || !nationality) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Author's name and nationality are required"
                }
            )
        }

        const newAuthor = await Author.create(
            {
                name,
                nationality
            }
        )

        res.status(201).json(
            {
                success: true,
                message: "Author created",
                data: newAuthor
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Author cannot be created",
                error: error.message
            }
        )
    }
}


export const getAuthors = async (req, res) => {
    try {
        const page = req.query.page || 1
        const limit = 5
        const authors = await Author.find()
        const authorsDisplay = await Author.find().select('name').skip((Number(page) - 1) * limit).limit(limit)

        res.status(200).json(
            {
                success: true,
                message: `Total of ${authors.length} authors found.`,
                data: authorsDisplay
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Author cannot be retrieved",
                error: error.message
            }
        )
    }
}


export const getAuthorById = async (req, res) => {
    try {
        const authorId = req.params.id
        const author = await Author.findById(authorId).select('name').select('nationality');

        res.status(200).json(
            {
                success: true,
                message: "Author retrieved",
                data: author
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Author cannot be retrieved",
                error: error.message
            }
        )
    }
}


export const udpateAuthorById = async (req, res) => {
    try {
        const updateData = req.body

        const authorId = req.params.id

        if (!updateData) {
            return res.status(400).json(
                {
                    success: true,
                    message: "No changes detected. Book cannot be updated",
                }
            )
        }

        const authorUpdated = await Author.findByIdAndUpdate(authorId, updateData, { new: true })

        res.status(200).json(
            {
                success: true,
                message: "Author updated successfully",
                data: authorUpdated
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Author cannot be retrieved",
                error: error.message
            }
        )
    }
}


export const deleteAuthorById = async (req, res) => {
    try {
        const authorId = req.params.id

        const authorDeleted = await Author.findOneAndDelete(authorId)

        res.status(200).json(
            {
                success: true,
                message: "Author deleted successfully",
                data: authorDeleted
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Author cannot be deleted",
                error: error.message
            }
        )
    }
} 