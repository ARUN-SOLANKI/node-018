import mongoose from 'mongoose';
import { config } from '../utils/configEnv.js';

const connectDB = async () => {
    const dbUrl = config.dbUrl;
    const dbName = config.dbName ;

    if (!dbUrl || !dbName) {
        console.error("DB_URL or DB_NAME is not set. Please check your environment variables.");
        process.exit(1);
    }

    try {
        await mongoose.connect(`${dbUrl}/${dbName}`, { connectTimeoutMS: 30000 });
        console.log("Successfully connected to MongoDB.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;
