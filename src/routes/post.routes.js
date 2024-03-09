import { Router } from "express";
import { createPost, deletePostById } from "../controllers/post.controller.js"
import { auth } from "../middlewares/auth.js";

const router = Router();


// * Retrieving own posts
// * Retrieving all posts
// * Retrieving a post by ID
// * Retrieving posts of a specific user
router.post('/', auth, createPost)    // OK - Creating a post
router.delete('/:id', auth, deletePostById)   //- Deleting a post by ID
// router.put('/', auth, updatePostById) //- Updating a post by ID

// router.get('/own', auth, getOwnPosts)
// router.get('/', auth, getPosts)

// router.get('/:id', auth, getPostById)
// router.get('/:userId', auth, getPostByUserId)



export default router;