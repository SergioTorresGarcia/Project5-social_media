import Post from "../models/Post.js"
import { handleError } from "../utils/handleError.js";
import { handleSuccess } from "../utils/handleSuccess.js";


export const createPost = async (req, res) => {
    try {
        const userId = req.tokenData.userId
        const content = req.body.content.trim()

        if (!content || content === ("")) {
            handleError(res, "Some content required", 400)
        }

        const newPost = await Post.create({
            userId,
            content
        })

        handleSuccess(res, "Post created", newPost, 201)
    } catch (error) {
        handleError(res, "Post cannot be created")
    }
}


export const deletePostById = async (req, res) => {
    try {
        const postId = req.params.id
        const postDeleted = await Post.findOneAndDelete(postId)

        handleSuccess(res, "Post deleted successfully", postDeleted)
    } catch (error) {
        handleError(res, "Post cannot be deleted")
    }
}


export const updatePostById = async (req, res) => {
    try {
        const postId = req.params.id
        const newContent = req.body.content

        if (!newContent) {
            handleError(res, "No changes detected. Post cannot be updated", 400)
        }

        const postUpdated = await Post.findByIdAndUpdate(postId, newContent, { new: true })

        handleSuccess(res, "Post updated successfully", postUpdated)
    } catch (error) {
        handleError(res, "Post cannot be retrieved")
    }
}


export const getOwnPosts = async (req, res) => {
    try {
        const userId = req.tokenData.userId

        const page = req.query.page || 1
        const limit = 2
        const posts = await Post.find({ userId })
        const ownPosts = await Post.find({ userId }).skip((Number(page) - 1) * limit).limit(limit).select('content')

        handleSuccess(res, `${posts.length} posts retrieved of yours`, ownPosts)
    } catch (error) {
        handleError(res, "Posts cannot be retrieved")
    }
}


export const getPosts = async (req, res) => {
    try {
        const page = req.query.page || 1
        const limit = 5
        const posts = await Post.find()
        const allPosts = await Post.find().skip((Number(page) - 1) * limit).limit(limit).select('content').select('likes').select('userId')

        handleSuccess(res, `${posts.length} posts retrieved`, allPosts)
    } catch (error) {
        handleError(res, "Posts cannot be retrieved")
    }
}


export const getPostById = async (req, res) => {
    try {
        const postId = req.params.id
        const page = req.query.page || 1
        const limit = 5

        const post = await Post.findById(postId).skip((Number(page) - 1) * limit).limit(limit).select('content')

        handleSuccess(res, "Post retrieved", post)
    } catch (error) {
        handleError(res, "Post cannot be retrieved")
    }
}


export const getPostByUserId = async (req, res) => {
    try {
        const userId = req.params.userId
        const numPosts = await Post.find({ userId })
        const page = req.query.page || 1
        const limit = 5

        const posts = await Post.find({ userId }).skip((Number(page) - 1) * limit).limit(limit).select('content').select('userId')

        handleSuccess(res, `${numPosts.length} post(s) by this user retrieved`, posts)
    } catch (error) {
        handleError(res, "Post cannot be retrieved for this user")
    }
}


export const likePost = async (req, res) => { // TO-DO: Post.update & User.update ??? para controlar likes (ids y usernames)
    try {
        const userId = req.tokenData.userId;
        const postId = req.params.id;

        const post = await Post.findById(postId);

        if (!post) {
            handleError(res, "Post not found", 404)
        }

        const likeList = post.likes;

        // Check if the user has already liked the post
        if (likeList.includes(userId)) {
            likeList.remove(req.tokenData.userId); // add like
            post.likes = likeList;

            const postLiked = await post.save();

            handleSuccess(res, `Like removed. This post has ${likeList.length} likes`, postLiked.likes)
        } else {
            likeList.push(req.tokenData.userId); // remove like
            post.likes = likeList;

            const postLiked = await post.save();

            handleSuccess(res, `Post liked. This post has ${likeList.length} likes`, postLiked.likes)
        }
    } catch (error) {
        handleError(res, "Like was not added or taken")
    }
}
