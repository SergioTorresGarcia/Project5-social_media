
import User from "../models/User.js";
import { handleError } from "../utils/handleError.js";
import { handleSuccess } from "../utils/handleSuccess.js";

export const getUsers = async (req, res) => {
    try {
        let queryList = {}; // Initialize an empty query object

        // Add query parameters for username and email (if they exist)
        if (req.query.username) {
            queryList.username = req.query.username;
        }
        if (req.query.email) {
            queryList.email = req.query.email;
        }

        const page = req.query.page || 1

        const limit = 5
        const users = await User.find(queryList)
        const usersDisplay = await User.find(queryList).skip((Number(page) - 1) * limit).limit(limit)

        handleSuccess(res, `Total of ${users.length} users found.`, usersDisplay)

    } catch (error) {
        handleError(res, "Users cant be retrieved")
    }
}


export const getUserProfile = async (req, res) => {
    try {
        const userId = req.tokenData.userId
        const user = await User.findById(userId)

        handleSuccess(res, "User retrieved succesfully", user)
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

        handleSuccess(res, "User updated succesfully", newUser)
    } catch (error) {
        handleError(res, "User cant be retrieved")
    }
}


export const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id
        const userDeleted = await User.findByIdAndDelete(userId)

        handleSuccess(res, "User deleted succesfully", userDeleted)
    } catch (error) {
        handleError(res, "User cant be deleted")
    }
}


export const updateUserRole = async (req, res) => {
    try {
        const userId = req.params.id
        const newRole = { role: req.body.role }

        const userUpdated = await User.findByIdAndUpdate(userId, newRole, { new: true })

        handleSuccess(res, "User's role updated succesfully", userUpdated)
    } catch (error) {
        handleError(res, "User's role cant be updated")
    }
}
