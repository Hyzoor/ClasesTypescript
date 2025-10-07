import axios from "axios";

const getMultipleCharactersName = async (ids: number[]) => {


    const charactersPromises = ids.map(async (x) => {

        return (await axios.get("https://rickandmortyapi.com/api/character/" + x)).data;

    });

    const characters = await Promise.all(charactersPromises);

    const charactersNames: string[] = characters.map((x) => {
        return x.name;
    })

    return charactersNames;


}

console.log(await getMultipleCharactersName([1, 2, 3]));

// Promise.allSettled ver