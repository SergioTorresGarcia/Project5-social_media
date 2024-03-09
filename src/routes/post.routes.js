import { Router } from "express";
import { createPost, deletePostById, getOwnPosts, getPostById, getPostByUserId, getPosts, updatePostById } from "../controllers/post.controller.js"
import { auth } from "../middlewares/auth.js";

const router = Router();

router.post('/', auth, createPost)                  // OK - Creating a post
router.delete('/:id', auth, deletePostById)         // OK - Deleting a post by ID
router.put('/:id', auth, updatePostById)            // OK- Updating a post by ID
router.get('/own', auth, getOwnPosts)               // OK - Retrieving own posts
router.get('/', auth, getPosts)                     // OK - Retrieving all posts
router.get('/:id', auth, getPostById)               // OK - Retrieving a post by ID
router.get('/any/:userId', auth, getPostByUserId)       //  - Retrieving posts of a specific user



export default router;