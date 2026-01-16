import { IResolvers } from "@graphql-tools/utils";
import { getDB } from "../db/mongo";
import { ObjectId } from "mongodb";
import { createUser, validateUser } from "../collections/usersPosts";
import { signToken } from "../auth/auth";
import { addPost, deletePost, updatePost, validatePostBelongsToUser } from "../collections/mongoPosts";
import { User } from "../types/user";




const coleccion = () => getDB().collection("Posts");

export const resolvers: IResolvers = {


    Query: {

        me: async (_, __, { user }) => {

            if (!user) return null;
            return {
                _id: user._id.toString(),
                nombre: user.nombre,
                email: user.email,
                postLibrary: user.postLibrary || []
            }
        },

        getPosts: async () => await coleccion().find().toArray(),
        getPost: async (_, { id }) => await coleccion().findOne({ _id: new ObjectId(id) }),

    },

    User: {
        postLibrary: async (parent: User) => {

            const objectIDs = parent.postLibrary.map((x) => new ObjectId(x));
            return await coleccion().find({ _id: { $in: objectIDs } }).toArray();

        }
    },

    Mutation: {

        register: async (_, { nombre, email, password }) => {
            const userId = await createUser(nombre, email, password);
            if (!userId) return "Ya existe el usuario"
            return signToken(userId);
        },

        login: async (_, { email, password }) => {
            const user = await validateUser(email, password);
            if (!user) throw new Error("Invalid credentials");
            return signToken(user._id.toString());
        },

        addPost: async (_, { post }, { user }) => {
            if (!user) throw new Error("Need to login to add posts");
            return await addPost({ ...post, idUser: user._id.toString() });
        },

        updatePost: async (_, { id, updates }, { user }) => {

            if (!user) throw new Error("Necesitas estar logeado...");
            await validatePostBelongsToUser(id, user._id.toString());
            return await updatePost(id, updates);
        },

        deletePost: async (_, { id }, { user }) => {

            if (!user) throw new Error("Necesitas estar logeado...");
            await validatePostBelongsToUser(id, user._id.toString());
            return await deletePost(id);
        }
    }



}