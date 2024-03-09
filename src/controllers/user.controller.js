
import User from "../models/User.js";


export const getUsers = async (req, res) => {
    try {
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


export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        console.log(user)


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


export const updateUserById = async (req, res) => {
    try {
        const userId = req.params.id
        const updateData = req.body


        const user = await User.findByIdAndUpdate(userId, updateData, { new: true })

        res.status(200).json({
            success: true,
            message: "User updated succesfully",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cant be updated",
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

