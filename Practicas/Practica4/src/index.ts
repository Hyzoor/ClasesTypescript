import { ApolloServer } from "apollo-server";
import { connectMongoDB } from "./db/mongo"
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { getUserFromToken } from "./auth/auth";



const start = async () => {

    await connectMongoDB();


    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async (ctxVar) => {

            const req = ctxVar.req;
            const token = req.headers.authorization || "";
            const user = token ? await getUserFromToken(token) : null;

            return { user }
        }

    })


    server.listen({ port: process.env.PORT }).then(() => console.log("Rumbeando cosa bonika"));
}

start();