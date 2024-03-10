import User from "../../models/User.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { dbConnection } from "../../database/db.js";

const userSeeder = async () => {
    try {
        const connect = await dbConnection();

        const user = await User.create([
            {
                email: "superadmin@superadmin.com",
                password: bcrypt.hashSync('123456', 10),
                role: "super_admin"
            }, {
                email: "admin@admin.com",
                password: bcrypt.hashSync('123456', 10),
                role: "admin",
            }, {
                email: "user@user.com",
                password: bcrypt.hashSync('123456', 10),
            },
        ]);
        console.log("-------------");
        console.log("Users created");
        console.log("-------------");
    } catch (error) {
        console.log(error);
    } finally {
        mongoose.disconnect();
    }
};

userSeeder();