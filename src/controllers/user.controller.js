
import User from "../models/User.js";


export const getUsers = async (req, res) => {
    try {
        // Missing dynamic url search based on query parameters (email)
        // const emailQuery = req.query.email
        // const email = email.Like("%" + emailQuery + "%")

        const page = req.query.page || 1
        const limit = 2
        const users = await User.find()
        const usersDisplay = await User.find().skip((Number(page) - 1) * limit).limit(limit)

        res.status(200).json({
            success: true,
            message: `Total of ${users.length} users found.`,
            data: usersDisplay
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Users cant be retrieved",
            error: error
        })
    }
}


export const getUserProfile = async (req, res) => {
    try {
        const userId = req.tokenData.userId
        const user = await User.findById(userId)

        res.status(200).json({
            success: true,
            message: "User retrieved succesfully",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cant be retrieved",
            error: error
        })
    }
}


export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.tokenData.userId
        const updateData = req.body
        const newUser = await User.findByIdAndUpdate(userId, updateData, { new: true })

        if (!updateData) {
            return res.status(400).json(
                {
                    success: true,
                    message: "No changes detected. User cannot be updated",
                }
            )
        }

        res.status(200).json({
            success: true,
            message: "User updated succesfully",
            data: newUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cant be retrieved",
            error: error
        })
    }
}


export const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id

        const userDeleted = await User.findByIdAndDelete(userId)

        res.status(200).json({
            success: true,
            message: "User deleted succesfully",
            data: userDeleted
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cant be deleted",
            error: error
        })
    }
}


export const updateUserRole = async (req, res) => {
    try {
        const userId = req.params.id
        const newRole = { role: req.body.role }

        const userUpdated = await User.findByIdAndUpdate(userId, newRole, { new: true })

        res.status(200).json({
            success: true,
            message: "User's role updated succesfully",
            data: userUpdated
        })
        console.log(2);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User's role cant be updated",
            error: error
        })
    }
}



