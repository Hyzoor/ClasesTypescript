import dotenv from "dotenv";
import express from "express";
import { connectMongoDB } from "./mongo";
import routerAuth from "./routes/routesAuth";
import routerCosikas from "./routes/routesCosikas";


dotenv.config();
connectMongoDB();
const app = express();
app.use(express.json());


app.use('/auth', routerAuth);
app.use('/cosika', routerCosikas);

app.listen(process.env.PORT, () => console.log("Conekted to API lks"));