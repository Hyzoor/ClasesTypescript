import dotenv from "dotenv";
import { Token } from "graphql";
import jwt from "jsonwebtoken"
import { getDB } from "./db/mongo";
import { ObjectId } from "mongodb";


dotenv.config();
const SECRET = process.env.SECRET;

type TokenPayload = {
    userid: string
}

export const signToken = (userid: string) => jwt.sign({ userid }, SECRET!, { expiresIn: "1h" });

export const verifyToken = (token: string): TokenPayload | null => {
    try {

        return jwt.verify(token, SECRET!) as TokenPayload;

    } catch (err) {
        return null;
    }
}

export const getUserFromToken = async (token: string) => {

    const payload = verifyToken(token);

    if (!payload) return null

    const db = getDB();
    return await db.collection("UsersVideogames").findOne({ _id: new ObjectId(payload.userid) });

}