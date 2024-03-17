import { Schema, model } from "mongoose";


const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        role: {
            type: String,
            enum: ["user", "admin", "super_admin"],
            default: "user"
        },
        profile: {
            name: {
                type: String
            },
            bio: {
                type: String
            }
        },
        following: [{
            type: String,
            default: 0
        }],
        followedBy: [{
            type: String,
            default: 0
        }]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const User = model('User', UserSchema)

export default User