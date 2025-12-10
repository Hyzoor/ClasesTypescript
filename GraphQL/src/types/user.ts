import { ObjectId } from "mongodb"





export type UserVideogame = {
    _id: ObjectId,
    email: string,
    videoGameLibrary: string[];
}