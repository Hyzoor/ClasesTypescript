
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import { getDB } from "../db/mongo";
import { ObjectId } from "mongodb";


dotenv.config();
const SECRET = process.env.SECRET;

type TokenPayload = {
    userId: string
}


export const signToken = (userId: string) => {
    if (!SECRET) return console.log("Error firmando, no hay secretiko");
    return jwt.sign({ userId }, SECRET, { expiresIn: "1h" });
}

export const verifyToken = (token: string): TokenPayload | null => {

    try {
        return jwt.verify(token, SECRET!) as TokenPayload;
    } catch (err) {
        return null;
    }
}

export const getUserFromToken = async (token: string) => {

    const payload = verifyToken(token);
    if (!payload) return null;
    const db = getDB();
    return await db.collection("UsersPosts").findOne({ _id: new ObjectId(payload.userId) });

}