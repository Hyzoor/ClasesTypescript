import { IResolvers } from "@graphql-tools/utils"
import { getDB } from "../db/mongo";
import { ObjectId } from "mongodb";
import { createUser, validateUser } from "../collections/usersVideogames";
import { signToken } from "../auth";
import { UserVideogame } from "../types/user";

const coleccion = () => getDB().collection("Videogames");
const coleccionUsers = () => getDB().collection("UsersVideogames");


export const resolvers: IResolvers = {

    Query: {

        me: async (_, __, { user }) => {

            if (!user) return null
            return {
                _id: user._id.toString(),
                email: user.email
            }
        },

        getVideogames: async () => {
            return await coleccion().find().toArray();
        },

        getVideogame: async (_, { id }) => {
            return await coleccion().findOne({ _id: new ObjectId(id) });
        }
    },


    User: {
        videoGameLibrary: async (parent: UserVideogame) => {

            const listaIDVideoGame = parent.videoGameLibrary;
            const objectIds = listaIDVideoGame.map((x) => new ObjectId(x));
            return await coleccion().find({ _id: { $in: objectIds } }).toArray();

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
        },

        addVideoGameToMyLibrary: async (_, { videoGameId }: { videoGameId: string }, { user }) => {


            if (!user) throw new Error("No eres nadie pinkfloyd");

            const userId = new ObjectId(user._id);
            const videoGame = await coleccion().findOne({ _id: new ObjectId(videoGameId) })

            await coleccion().updateOne({ _id: userId }, {
                $addToSet: { videoGameLibrary: videoGameId },
            })

            const updatedUser = await coleccionUsers().findOne({ _id: userId });
            return updatedUser;


        }



    }

}

