import Post from "../models/Post.js"


export const createPost = async (req, res) => {
    try {
        const { userId, content } = req.body

        if (!userId || !content) {
            return res.status(400).json(
                {
                    success: false,
                    message: "UserId and content required"
                }
            )
        }

        const newPost = await Post.create(
            {
                userId,
                content
            }
        )

        res.status(201).json(
            {
                success: true,
                message: "Post created",
                data: newPost
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Post cannot be created",
                error: error.message
            }
        )
    }
}


export const getPosts = async (req, res) => {
    try {
        const page = req.query.page || 1
        const limit = 5
        const posts = await Post.find()
        const postsDisplay = await Post.find().skip((Number(page) - 1) * limit).limit(limit) // .select('content')

        res.status(200).json(
            {
                success: true,
                message: `Total of ${posts.length} posts found.`,
                data: postsDisplay
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Post cannot be retrieved",
                error: error.message
            }
        )
    }
}


// export const getPostById = async (req, res) => {
//     try {
//         const bookId = req.params.id
//         const book = await Book.findById(bookId).select('title').select('author');

//         res.status(200).json(
//             {
//                 success: true,
//                 message: "Book retrieved",
//                 data: book
//             }
//         )
//     } catch (error) {
//         res.status(500).json(
//             {
//                 success: false,
//                 message: "Book cannot be retrieved",
//                 error: error.message
//             }
//         )
//     }
// }


// export const udpateBookById = async (req, res) => {
//     try {
//         const updateData = req.body

//         const bookId = req.params.id

//         if (!updateData) {
//             return res.status(400).json(
//                 {
//                     success: true,
//                     message: "No changes detected. Book cannot be updated",
//                 }
//             )
//         }

//         const bookUpdated = await Book.findByIdAndUpdate(bookId, updateData, { new: true })

//         res.status(200).json(
//             {
//                 success: true,
//                 message: "Book updated successfully",
//                 data: bookUpdated
//             }
//         )
//     } catch (error) {
//         res.status(500).json(
//             {
//                 success: false,
//                 message: "Book cannot be retrieved",
//                 error: error.message
//             }
//         )
//     }
// }


// export const deleteBookById = async (req, res) => {
//     try {
//         const bookId = req.params.id

//         const bookDeleted = await Book.findOneAndDelete(bookId)

//         res.status(200).json(
//             {
//                 success: true,
//                 message: "Book deleted successfully",
//                 data: bookDeleted
//             }
//         )
//     } catch (error) {
//         res.status(500).json(
//             {
//                 success: false,
//                 message: "Book cannot be deleted",
//                 error: error.message
//             }
//         )
//     }
// } 