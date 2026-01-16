import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";


let client: MongoClient;
let dB: Db;
const dbName: string = "Universidad";

dotenv.config();


export const connectMongoDB = async () => {
    try {

        const mongoURL = process.env.MONGO_URL;
        if (!mongoURL) return console.log("No existe url para el monguete");

        client = new MongoClient(mongoURL);
        dB = client.db(dbName);
        console.log("Conectado al monguito");


    } catch (err) {
        console.log("Error en el monguito", err);
    }
}

export const getDB = () => dB;

export const closeMongoDB = async () => {
    try {
        client && await client.close();
    } catch (err) {
        console.log("Error en el monguito", err);
    }
}