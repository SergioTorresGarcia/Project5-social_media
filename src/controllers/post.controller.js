import Post from "../models/Post.js"


export const createPost = async (req, res) => {
    try {
        const userId = req.tokenData.userId
        const content = req.body.content.trim()

        if (!content || content === ("")) {
            return res.status(400).json({
                success: false,
                message: "Some content required"
            })
        }

        const newPost = await Post.create({
            userId,
            content
        })

        res.status(201).json({
            success: true,
            message: "Post created",
            data: newPost
        })
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


export const deletePostById = async (req, res) => {
    try {
        const postId = req.params.id
        const postDeleted = await Post.findOneAndDelete(postId)

        res.status(200).json(
            {
                success: true,
                message: "Post deleted successfully",
                data: postDeleted
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Post cannot be deleted",
                error: error.message
            }
        )
    }
}


export const updatePostById = async (req, res) => {
    try {
        const postId = req.params.id
        const newContent = req.body.content

        if (!newContent) {
            return res.status(400).json(
                {
                    success: true,
                    message: "No changes detected. Post cannot be updated",
                }
            )
        }

        const postUpdated = await Post.findByIdAndUpdate(postId, newContent, { new: true })

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: postUpdated
        })

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

export const getOwnPosts = async (req, res) => {
    try {
        const userId = req.tokenData.userId

        const page = req.query.page || 1
        const limit = 2
        const posts = await Post.find({ userId })
        const ownPosts = await Post.find({ userId }).skip((Number(page) - 1) * limit).limit(limit).select('content')

        res.status(200).json(
            {
                success: true,
                message: `${posts.length} posts retrieved of yours`,
                data: ownPosts
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Posts cannot be retrieved",
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
        const allPosts = await Post.find().skip((Number(page) - 1) * limit).limit(limit).select('content').select('likes').select('userId')

        res.status(200).json(
            {
                success: true,
                message: `${posts.length} posts retrieved`,
                data: allPosts
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Posts cannot be retrieved",
                error: error.message
            }
        )
    }
}


export const getPostById = async (req, res) => {
    try {
        const postId = req.params.id
        const numPosts = await Post.find({ userId })
        const page = req.query.page || 1
        const limit = 5

        const post = await Post.findById(postId).skip((Number(page) - 1) * limit).limit(limit).select('content')

        res.status(200).json(
            {
                success: true,
                message: "Post retrieved",
                data: post
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


export const getPostByUserId = async (req, res) => {
    try {
        const userId = req.params.userId
        const numPosts = await Post.find({ userId })
        const page = req.query.page || 1
        const limit = 5

        const posts = await Post.find({ userId }).skip((Number(page) - 1) * limit).limit(limit).select('content').select('userId')

        res.status(200).json(
            {
                success: true,
                message: `${numPosts.length} post(s) by this user retrieved`,
                data: posts
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Posts cannot be retrieved for this user",
                error: error.message
            }
        )
    }
}


export const likePost = async (req, res) => {
    try {
        const userId = req.tokenData.userId;
        const postId = req.params.id;
        console.log(userId);
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found',
            });
        }

        const likeList = post.likes;

        // Check if the user has already liked the post
        if (likeList.includes(userId)) {
            likeList.remove(req.tokenData.userId);
            post.likes = likeList;

            const postLiked = await post.save();
            console.log(postLiked.likes);
            res.status(200).json({
                success: true,
                message: `Like removed. This post has ${likeList.length} likes`,
                data: postLiked.likes,
            });
        } else {
            likeList.push(req.tokenData.userId);
            post.likes = likeList;

            const postLiked = await post.save();
            console.log(postLiked.likes);
            res.status(200).json({
                success: true,
                message: `Post liked. This post has ${likeList.length} likes`,
                data: postLiked.likes,
            });
        }



    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Like was not added or taken",
                error: error.message
            }
        )
    }
}

