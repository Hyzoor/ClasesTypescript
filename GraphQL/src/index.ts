import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolver";
import { connectToMongoDB } from "./db/mongo";



const start = async () => {


    await connectToMongoDB();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: (req) => req
    });

    server.listen({ port: 4000 }).then(() => {
        console.log("gql rumbeando en el puerto 4000")
    })

}


start();


