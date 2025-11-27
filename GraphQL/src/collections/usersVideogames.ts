import { ObjectId } from "mongodb";
import { getDB } from "../db/mongo";
import bcrypt from "bcryptjs";

const COLECCION = "UsersVideogames";

export const createUser = async (email: string, password: string) => {

    const db = getDB();
    const encryptedPasswd = await bcrypt.hash(password, 10);

    const result = await db.collection(COLECCION).insertOne({
        email,
        password: encryptedPasswd
    })

    return result.insertedId.toString();

}

export const validateUser = async (email: string, password: string) => {


    const db = getDB();
    const user = await db.collection(COLECCION).findOne({ email });

    if (!user) return null

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null

    return user;
}

export const findUserById = async (id: string) => {

    const db = getDB();

    return await db.collection(COLECCION).findOne({ _id: new ObjectId(id) });

}