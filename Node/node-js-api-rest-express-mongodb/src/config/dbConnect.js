import mongoose, { mongo } from "mongoose";


async function conectaDatabase() {
    const connectionString = 
        mongoose.connect(process.env.DB_CONNECTION_STRING);

    return mongoose.connection;
};

export default conectaDatabase;