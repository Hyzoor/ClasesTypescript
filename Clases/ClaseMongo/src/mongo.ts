import { MongoClient, type Db } from "mongodb";


let client: MongoClient
let DB: Db
const dbName = "Universidad";

export const connectMongoDB = async (): Promise<void> => {

    try {

        const mongoURL = `mongodb+srv://${process.env.USER_MONGO}:${process.env.USER_PASSWORD}@${process.env.MONGO_CLUSTER}.bqrxevu.mongodb.net/?appName=${process.env.MONGO_APP_NAME}`
        client = new MongoClient(mongoURL);
        await client.connect();
        DB = client.db(dbName);
        console.log("Connected to mongodb at db: " + dbName);

    } catch (error) {

        console.log("Error al conectarse a mongo: ", error)

    }
}

export const getDb = () => DB;