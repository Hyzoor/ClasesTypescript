import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

let client: MongoClient;
let dB: Db;
const dbName = "Universidad";

dotenv.config();

export const connectToMongoDB = async (): Promise<void> => {
    try {
        const mongoURL = `mongodb+srv://${process.env.USER_MONGO}:${process.env.USER_PASSWORD}@${process.env.MONGO_CLUSTER}.bqrxevu.mongodb.net/?appName=${process.env.MONGO_APP_NAME}`
        client = new MongoClient(mongoURL);
        dB = client.db(dbName);
        console.log("Conectado al monguito")

    } catch (err) {
        console.log("Error al conectar a mongoDB", err);
    }
}

export const getDB = () => dB;

export const closeMongoDB = async () => {
    try {
        client && await client.close();
    } catch (err) {
        console.log("Error cerrando el monguito");
    }
} 