import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolver";
import { connectToMongoDB } from "./db/mongo";
import { getUserFromToken } from "./auth";



const start = async () => {

    await connectToMongoDB();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async (ctxVar) => {
            const req = ctxVar.req

            const token = req.headers.authorization || "";
            const user = token ? await getUserFromToken(token as string) : null;

            return { user }
        }
    });

    server.listen({ port: 4000 }).then(() => {
        console.log("gql rumbeando en el puerto 4000")
    })

}


start();


