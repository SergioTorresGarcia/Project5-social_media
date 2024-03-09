import { Router } from "express";
import { createPost, deletePostById, getOwnPosts, getPosts, updatePostById } from "../controllers/post.controller.js"
import { auth } from "../middlewares/auth.js";

const router = Router();

router.post('/', auth, createPost)                  // OK - Creating a post
router.delete('/:id', auth, deletePostById)         // OK - Deleting a post by ID
router.put('/:id', auth, updatePostById)            // OK- Updating a post by ID

router.get('/own', auth, getOwnPosts)               //  - Retrieving own posts
router.get('/', auth, getPosts)                     //  - Retrieving all posts
// router.get('/:id', auth, getPostById)            //  - Retrieving a post by ID
// router.get('/:userId', auth, getPostByUserId)    //  - Retrieving posts of a specific user



export default router;