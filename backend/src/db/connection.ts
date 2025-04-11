import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL is not defined in environment variables");
        }

        await connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error: any) {
        console.error("Error connecting to MongoDB:", error.message);
        throw new Error("Cannot connect to MongoDB");
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect();
        console.log("Disconnected from MongoDB");
    } catch (error: any) {
        console.error("Error disconnecting from MongoDB:", error.message);
        throw new Error("Cannot disconnect from MongoDB");
    }
}

export { connectToDatabase, disconnectFromDatabase };
