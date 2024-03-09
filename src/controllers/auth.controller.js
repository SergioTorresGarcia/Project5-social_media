
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { isValidEmail } from "../helpers/emailValidation.js";
import { isValidPassword } from "../helpers/passwordValidation.js";


export const register = async (req, res) => {
    try {
        console.log(1);
        // validate body
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        console.log(2);
        // validate email & password
        const validEmail = isValidEmail(email);
        const validPassword = isValidPassword(password);

        if (!validEmail || !validPassword) {
            res.status(400).json({
                success: false,
                message: "Email or password invalid"
            })
        }
        console.log(3);
        // create new user using username, email & password
        const newUser = await User.create({
            username,
            email,
            password
        })

        res.status(201).json({
            success: true,
            message: "User registered succesfully",
            data: newUser
        })
        console.log(4);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cant be registered",
            error: error
        })
    }
}


export const login = async (req, res) => {
    try {
        // validate body
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are mandatories"
            })
        }

        // validate data
        const validEmail = isValidEmail(email);
        const ValidPassword = isValidPassword(password);

        if (!validEmail || !ValidPassword) {
            res.status(400).json({
                success: false,
                message: "Email or password invalid"
            })
        }

        // validate user exists
        const user = await User.findOne({ email: email })

        if (!user) {
            res.status(400).json({
                success: false,
                message: "Cannot find the user"
            })
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

        res.status(200).json({
            success: true,
            message: "User logged succesfully",
            token: token //MOSTRAMOS EL TOKEN DE MANERA TEMPORAL PARA PODER PROBAR CON ÉL OTRA FUNCIONALIDADES
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User cant be logged",
            error: error
        })
    }
}