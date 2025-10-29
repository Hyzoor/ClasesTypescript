import express from "express"
import { connectMongoDB } from "./mongo";
import router from "./routes";
import dotenv from "dotenv";



dotenv.config();

connectMongoDB();

const app = express();
app.use(express.json);
app.use('/api/personas', router)

app.listen(3000, () => console.log("Connected API"));
