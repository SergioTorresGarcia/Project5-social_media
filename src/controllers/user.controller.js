
import User from "../models/User.js";


export const getUsers = async (req, res) => {
    try {
        // dynamic url search based on query parameters (email or username)
        const param = req.query;
        const query = param ? param : "";

        const page = req.query.page || 1
        const limit = 2
        const users = await User.find(query)
        const usersDisplay = await User.find(query).skip((Number(page) - 1) * limit).limit(limit)

        res.status(200).json({
            success: true,
            message: `Total of ${users.length} users found.`,
            data: usersDisplay
        })

    } catch (error) {
        handleError(res, "Users cant be retrieved")
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
        handleError(res, "User cant be retrieved")
    }
}


export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.tokenData.userId
        const updateData = req.body
        const newUser = await User.findByIdAndUpdate(userId, updateData, { new: true })

        if (!updateData) {
            handleError(res, "No changes detected. User cannot be updated", 400)
        }

        res.status(200).json({
            success: true,
            message: "User updated succesfully",
            data: newUser
        })
    } catch (error) {
        handleError(res, "User cant be retrieved")
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
        handleError(res, "User cant be deleted")
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
        handleError(res, "User's role cant be updated")
    }
}
