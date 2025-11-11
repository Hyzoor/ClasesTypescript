import express from "express";
import { connectMongoDB } from "./mongo";
import router from "./routes";
import dotenv from "dotenv";

dotenv.config();

connectMongoDB();

const app = express();
app.use(express.json());
app.use("/api/discos", router);
app.listen(process.env.PORT, () => console.log("Connected to API"));