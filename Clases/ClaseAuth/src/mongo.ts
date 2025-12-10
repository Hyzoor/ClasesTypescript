import { Db, MongoClient } from "mongodb";


let client: MongoClient;
let dB: Db;
const dbName: string = "Universidad";


export const connectMongoDB = async (): Promise<void> => {

    try {

        const mongoURL = `mongodb+srv://${process.env.USER_MONGO}:${process.env.USER_PASSWORD}@${process.env.MONGO_CLUSTER}.bqrxevu.mongodb.net/?appName=${process.env.MONGO_APP_NAME}`
        client = new MongoClient(mongoURL);
        dB = client.db(dbName);
        console.log("Connected to mongodb at db: " + dbName);

    } catch (error) {
        console.log("Error al conectar a MongoDB", error);
    }
}

export const getDB = () => dB;