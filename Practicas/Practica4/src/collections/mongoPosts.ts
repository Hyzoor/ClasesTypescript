import { Collection, ObjectId } from "mongodb";
import { getDB } from "../db/mongo"
import { Post } from "../types/post"

const coleccion = () => getDB().collection("Posts");



export const validatePostBelongsToUser = async (idPost: string, idUser: string) => {

    const post = await coleccion().findOne({ _id: new ObjectId(idPost) });
    if (!post) throw new Error("No existe un post con ese id, tas equivocao tt");
    if (idUser != post.idUser) throw new Error("No toques lo que no es tuyo ttiko");

}

export const addPost = async (post: Post) => {

    const result = await coleccion().insertOne(post);
    return await coleccion().findOne({ _id: result.insertedId });

}

export const updatePost = async (id: string, updates: Post) => {

    await coleccion().updateOne(
        { _id: new ObjectId(id) },
        { $set: updates }
    )

    return await coleccion().findOne({ _id: new ObjectId(id) });
}

export const deletePost = async (id: string) => {

    const oldPost = await coleccion().findOne({ _id: new ObjectId(id) });
    await coleccion().deleteOne({ _id: new ObjectId(id) });

    return oldPost;
}