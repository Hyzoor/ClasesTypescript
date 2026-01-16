import { ObjectId } from "mongodb";
import { getDB } from "../db/mongo";
import { COLECCION_OWNED_POKEMONS, COLECCION_POKEMONS, COLECCION_USERS } from "../utils";
import { PokemonType } from "../types";


export const pokemons = async (page: number, size: number) => {
    page = page || 1;
    size = size || 10;
    return await getDB().collection(COLECCION_POKEMONS).find().skip((page - 1) * size).limit(size).toArray();
}

export const createPokemon = async (name: string, description: string, height: number, weight: number, types: PokemonType[]) => {

    const result = await getDB().collection(COLECCION_POKEMONS).insertOne({
        name, description, height, weight, types
    });

    const newPokemon = getPokemonID(result.insertedId.toString());
    return newPokemon;
}

export const catchPokemon = async (pokemonId: string, nickname: string, trainerID: string) => {


    const exists = await getPokemonID(pokemonId);
    if (!exists) throw new Error("Ese pokemon no existe");

    const min = 1;
    const max = 100;

    const result = await getDB().collection(COLECCION_OWNED_POKEMONS).insertOne({
        pokemon: pokemonId,
        nickname: nickname,
        attack: getRandomStat(max, min),
        defense: getRandomStat(max, min),
        speed: getRandomStat(max, min),
        special: getRandomStat(max, min),
        level: getRandomStat(max, min)
    })

    await getDB().collection(COLECCION_USERS).updateOne({ _id: new ObjectId(trainerID) }, {
        $addToSet: { pokemons: result.insertedId.toString() }
    });

    return getOwnedPokemonID(result.insertedId.toString());
}

export const freePokemon = async (pokemonId: string, trainerId: string, pokemons: string[]) => {


    const exists = await getOwnedPokemonID(pokemonId);
    if (!exists) throw new Error("Ese pokemon no existe");

    const newPokemons = pokemons.filter((x: string) => {
        x != pokemonId;
    });

    await getDB().collection(COLECCION_USERS).updateOne({ _id: new ObjectId(trainerId) }, {
        $set: { pokemons: newPokemons }
    });

    await getDB().collection(COLECCION_POKEMONS).deleteOne({ _id: new ObjectId(pokemonId) });

    return await getDB().collection(COLECCION_USERS).findOne({ _id: new ObjectId(trainerId) })

}

export const getPokemonID = async (id: string) => {

    const pokemon = await getDB().collection(COLECCION_POKEMONS).findOne({ _id: new ObjectId(id) });
    if (!pokemon) return null;
    return pokemon;
}

export const getOwnedPokemonID = async (id: string) => {

    const pokemon = await getDB().collection(COLECCION_OWNED_POKEMONS).findOne({ _id: new ObjectId(id) });

    if (!pokemon) return null;

    return pokemon;
}

export const getOwnedPokemonsFromIDS = async (ids: string[]) => {

    const idsMongo = ids.map((x) => new ObjectId(x));

    return await getDB().collection(COLECCION_OWNED_POKEMONS).find({ _id: { $in: idsMongo } }).toArray();

}

const getRandomStat = (max: number, min: number) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}