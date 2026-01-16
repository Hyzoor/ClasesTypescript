import { IResolvers } from "@graphql-tools/utils";
import { createUser, validateUser } from "../collections/user";
import { signToken } from "../auth";
import { catchPokemon, createPokemon, freePokemon, getOwnedPokemonsFromIDS, getPokemonID, pokemons } from "../collections/pokemons";


export const resolvers: IResolvers = {

    Query: {

        me: async (_, __, { user }) => {
            if (!user) throw new Error("No estas logado");
            return {
                _id: user._id.toString(),
                ...user
            }
        },

        pokemons: async (_, { page, size }) => {
            return await pokemons(page, size);
        },

        pokemon: async (_, { id }) => {
            return await getPokemonID(id);
        }

    },

    Trainer: {
        pokemons: async (parent) => {
            return await getOwnedPokemonsFromIDS(parent.pokemons);
        }
    },

    OwnedPokemon: {

        pokemon: async (parent) => {
            return await getPokemonID(parent.pokemon)
        }

    },

    Mutation: {
        startJourney: async (_, args) => {
            const idUsuarioNuevo = await createUser(args.name, args.password);
            return signToken(idUsuarioNuevo);
        },

        login: async (_, args) => {
            const user = await validateUser(args.name, args.password);
            if (!user) throw new Error("Contra mal ash ketchup");
            return signToken(user._id.toString());
        },

        createPokemon: async (_, { name, description, height, weight, types }, { user }) => {
            if (!user) throw new Error("Necesitas logarte para crear pokemons champion");
            return createPokemon(name, description, height, weight, types);
        },

        catchPokemon: async (_, { pokemonId, nickname }, { user }) => {
            if (!user) throw new Error("Necesitar logarte para capturar pokemones");
            if (user.pokemons.length == 6) throw new Error("No puedes capturar mas de 6 pokemons avaricioso")

            return catchPokemon(pokemonId, nickname, user._id.toString())
        },

        freePokemon: async (_, { ownedPokemonId }, { user }) => {
            if (!user) throw new Error("Necesitar logarte para capturar pokemones");
            if (!user.pokemons.includes(ownedPokemonId)) throw new Error("No puedes liberar un pokemon que no es tuyo");

            return freePokemon(ownedPokemonId, user._id.toString(), user.pokemons);
        }
    }
}