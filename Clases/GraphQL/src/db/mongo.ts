import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

let client: MongoClient;
let dB: Db;
const dbName = "Universidad";

dotenv.config();

export const connectToMongoDB = async (): Promise<void> => {
    try {
        const mongoURL = process.env.MONGO_URL;
        if (!mongoURL) return console.log("No existe url para el monguete");

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