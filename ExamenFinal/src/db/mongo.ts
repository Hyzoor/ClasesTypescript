import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv"
import { DB_NAME } from "../utils";



let client: MongoClient;
let db: Db;
dotenv.config();

export const connectToMongoDB = async () => {

    try {
        const mongoURL = process.env.MONGO_URL;
        if (!mongoURL) return console.log("No hay url para el monguete loquete");
        client = new MongoClient(mongoURL);
        db = client.db(DB_NAME);
        console.log("Conectado al monguete loquete");
    } catch (error) {
        console.log("Error conectando al monguete", error);
    }

}


export const getDB = () => db;