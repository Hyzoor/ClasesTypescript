import { gql } from "apollo-server";

export const typeDefs = gql`

    type Videogame {

        _id: ID!,
        name: String,
        platform: String,
        date: String

    }

    type User {
        _id: ID!,
        email: String!
    }


    type Query {
        me: User,
        getVideogames: [Videogame]!,
        getVideogame(_id:ID!): Videogame

    }

    type Mutation {

        addVideogame(name: String!, platform: String!, date: String!): Videogame!,
        register(email: String!, password: String!) : String!,
        login(email: String!, password: String!) : String!
    }
`;