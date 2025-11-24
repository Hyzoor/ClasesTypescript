import { gql } from "apollo-server";

export const typeDefs = gql`

    type Videogame {

        _id: ID!,
        name: String,
        platform: String,
        date: String

    }


    type Query {

        getVideogames: [Videogame]!,
        getVideogame(_id:ID!): Videogame

    }

    type Mutation {

        addVideogame(name: String!, platform: String!, date: String!): Videogame!
    }
`;