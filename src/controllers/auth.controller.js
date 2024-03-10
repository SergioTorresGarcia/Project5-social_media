
import jwt from "jsonwebtoken";
import User from "../models/User.js";

import { isValidEmail } from "../helpers/emailValidation.js";
import { isValidPassword } from "../helpers/passwordValidation.js";
import { handleError } from "../utils/handleError.js";
import { handleSuccess } from "../utils/handleSuccess.js";


export const register = async (req, res) => {
    try {
        // validate body
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            handleError(res, "All fields are required", 400)
        }

        // validate email & password
        const validEmail = isValidEmail(email);
        const validPassword = isValidPassword(password);

        if (!validEmail || !validPassword) {
            handleError(res, "Email or password invalid", 400)
        }

        // create new user using username, email & password
        const newUser = await User.create({
            username,
            email,
            password
        })

        handleSuccess(res, "User registered succesfully", newUser, 201)
    } catch (error) {
        handleError(res, "User cant be registered")
    }
}


export const login = async (req, res) => {
    try {
        // validate body
        const { email, password } = req.body;

        if (!email || !password) {
            handleError(res, "Email and password are mandatories", 400)
        }

        // validate data
        const validEmail = isValidEmail(email);
        const ValidPassword = isValidPassword(password);

        if (!validEmail || !ValidPassword) {
            handleError(res, "Email or password invalid", 400)
        }

        // validate user exists
        const user = await User.findOne({ email: email })

        if (!user) {
            handleError(res, "Cannot find the user", 400)
        }

        // create token
        const token = jwt.sign(
            {
                userId: user._id,
                roleName: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "200h"
            }
        )

        handleSuccess(res, "User logged succesfully", token)
        //MOSTRAMOS EL TOKEN DE MANERA TEMPORAL PARA PODER PROBAR CON ÉL OTRA FUNCIONALIDADES
    } catch (error) {
        handleError(res, "User cant be logged")
    }
}
