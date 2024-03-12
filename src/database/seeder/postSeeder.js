
import Post from "../../models/Post.js";
import mongoose from "mongoose";
import { dbConnection } from "../../database/db.js";
import { faker } from "@faker-js/faker";


const fakePosts = []
export const fakePostSeeder = async (numberOfUsers) => {
    try {
        await dbConnection();
        await Post.deleteMany({});
        let fakePost;
        for (let i = 0; i < (numberOfUsers + 3); i++) {
            let numId = (`${i + 1}`).padStart(24, '0')
            fakePost = new Post({
                userId: new mongoose.Types.ObjectId(numId),
                content: faker.lorem.text()
            });
            fakePosts.push(fakePost);
        }
        // Insert the generated users into the database
        await Post.insertMany(fakePosts);
        console.log(`Successfully seeded a post for each user.`);
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Disconnect from the database
        mongoose.disconnect();
    }
};