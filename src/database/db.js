

import mongoose from 'mongoose';

// const MONGO_URI = `mongodb://root:root@127.0.0.1:27017/test?authSource=admin`

// o por ejemplo appDataSource (como en typeorm)
export const dbConnection = () => {
    return mongoose.connect(
        process.env.MONGO_URI,
        {}
    );
}