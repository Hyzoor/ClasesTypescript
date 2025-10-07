import axios from "axios";

type Character = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    origin: any,
    location: any,
    image: string,
    url: string,
    created: string,
    gender: string,
    episode: any[],
}


type Episode = {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    url: string,
    created: string
}


const getEpisodesFromCharacter = async (id: number) => {

    try {

        const endpoint: string = "https://rickandmortyapi.com/api/character/" + id;

        const character: Character = (await axios.get(endpoint)).data;

        const episodesDataPromises = character.episode.map(async (x) => {
            return (await axios.get(x)).data;
        })
        const episodes: Episode[] = await Promise.all(episodesDataPromises);


        return episodes;

    } catch (Error) {
        console.log(Error);
    }

}


// console.log(await getEpisodesFromCharacter(4));

const prueba = (id: number) => {

    const endpoint: string = "https://rickandmortyapi.com/api/character/" + id;

    axios.get(endpoint).then((response) => {
        console.log(response);
    })

}

prueba(7);