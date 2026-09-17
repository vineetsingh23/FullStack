import dotenv from 'dotenv';

dotenv.config();

const env ={
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 8000,
    mongoUri: process.env.MONGO_URI,
    corsOrigin: process.env.CORS_ORIGIN || "*"
};

if (!env.mongoUri) {
    throw new Error("MONGO_URI is missing in .env")
}

export default env;