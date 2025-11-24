import { IResolvers } from "@graphql-tools/utils"
import { Videogame } from "../types/Videogame";
import { getDB } from "../db/mongo";
import { ObjectId } from "mongodb";

const coleccion = () => getDB().collection("Videogames");


export const resolvers: IResolvers = {

    Query: {

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
        }


    }

}

