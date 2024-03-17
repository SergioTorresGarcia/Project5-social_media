import { Router } from "express";
import { createPost, deletePostById, getOwnPosts, getPostById, getPosts, getTimeline, likePost, updatePostById } from "../controllers/post.controller.js"
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get('/timeline', auth, getTimeline)          // OK - Getting posts of people you follow
router.post('/', auth, createPost)                  // OK - Creating a post
router.delete('/:id', auth, deletePostById)         // OK - Deleting a post by ID
router.put('/:id', auth, updatePostById)            // OK - Updating a post by ID
router.get('/own', auth, getOwnPosts)               // OK - Retrieving own posts
router.get('/', auth, getPosts)                     // OK - Retrieving all posts
router.get('/:id', auth, getPostById)               // OK - Retrieving a post by ID
router.put('/like/:id', auth, likePost)             // OK - Liking a post

export default router;