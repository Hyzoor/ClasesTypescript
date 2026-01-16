import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { getDB } from "./db/mongo";
import { ObjectId } from "mongodb";
import { COLECCION_USERS } from "./utils";

dotenv.config();

const secret = process.env.SECRET;

export const signToken = (userID: string) => {

    if (!secret) throw new Error("No secret to create token");
    return jwt.sign({ userID }, secret!, { expiresIn: "1h" });

}

export const verifyToken = (token: string) => {
    try {

        if (!secret) throw new Error("No secret to decode token");
        return jwt.verify(token, secret) as { userID: string };

    } catch (err) {
        return null;
    }
}

export const getUserFromToken = async (token: string) => {
    const payload = verifyToken(token);
    if (!payload) return null;
    const db = getDB();
    return await db.collection(COLECCION_USERS).findOne({ _id: new ObjectId(payload.userID) });
}

