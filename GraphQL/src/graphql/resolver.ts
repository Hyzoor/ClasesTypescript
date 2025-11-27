import { IResolvers } from "@graphql-tools/utils"
import { getDB } from "../db/mongo";
import { ObjectId } from "mongodb";
import { createUser, validateUser } from "../collections/usersVideogames";
import { signToken } from "../auth";

const coleccion = () => getDB().collection("Videogames");


export const resolvers: IResolvers = {

    Query: {

        me: async (_, __, { user }) => {

            if (!user) return null
            return {
                _id: user._id.toString(),
                email: user.emaila
            }
        },

        getVideogames: async () => {
            return await coleccion().find().toArray();
        },

        getVideogame: async (_, { id }) => {
            return await coleccion().findOne({ _id: new ObjectId(id) });
        }
    },

    Mutation: {

        addVideogame: async (_, { name, platform, date }) => {
            const result = await coleccion().insertOne({ name, platform, date });
            return await coleccion().findOne({ _id: result.insertedId });
        },


        register: async (_, { email, password }: { email: string, password: string }) => {
            const userId = await createUser(email, password);
            return signToken(userId);
        },

        login: async (_, { email, password }: { email: string, password: string }) => {

            const user = await validateUser(email, password);
            if (!user) throw new Error("Invalid credentials");

            return signToken(user._id.toString());
        }



    }

}

