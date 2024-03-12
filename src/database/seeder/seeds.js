import { userSeeder, fakeUserSeeder } from "./userSeeder.js";
import { fakePostSeeder } from "./postSeeder.js";

async function runSeeders(numberOfUsers) {
    console.log('Running seeders...');

    await userSeeder();
    await fakeUserSeeder(numberOfUsers);
    await fakePostSeeder(numberOfUsers)

    console.log('Seeders completed.');
}

runSeeders(7);