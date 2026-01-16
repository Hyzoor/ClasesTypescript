import { getDB } from "../db/mongo"
import bcrypt from "bcryptjs"
import { COLECCION_USERS } from "../utils";


export const createUser = async (name: string, password: string) => {

    const exists = await getDB().collection(COLECCION_USERS).findOne({ name: name });

    if (exists) throw new Error("Ya existe un usuario con ese nombre");

    const passwdEncriptada = await bcrypt.hash(password, 10);

    const result = await getDB().collection(COLECCION_USERS).insertOne({
        name,
        password: passwdEncriptada,
        pokemons: []
    })

    return result.insertedId.toString();

}


export const validateUser = async (name: string, password: string) => {

    const user = await getDB().collection(COLECCION_USERS).findOne({ name });
    if (!user) return null;

    const valid = bcrypt.compare(password, user.password);
    if (!valid) return null;
    return user;

}