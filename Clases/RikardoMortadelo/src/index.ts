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

type QueryValue = {
    query : string,
    values : string
}

const obtenerPersonajes = (name?:string, status?:string, gender?:string) => {

    const paremeters: QueryValue[] = [];
    if(name) paremeters.push({query:"name", values:name});
    if(status) paremeters.push({query:"status", values:status});
    if(gender) paremeters.push({query:"gender", values:gender});

    const filter: string = paremeters.reduce((accumulator, current) => { 
        return accumulator + current.query + "=" + current.values + "&";
    }, "?");

    const endpoint: string = "https://rickandmortyapi.com/api/character/" + filter;

    axios.get(endpoint).then((response) => {

        const characters: Character[] = response.data.results;
        
        const characterssWithEpisodesPromises = characters.map((i:Character) => {

            const episodesURLS = i.episode;
            const episodesPromises = episodesURLS.map((epURL) => {
                return axios.get(epURL).then((response) => {
                    const episode: Episode = response.data;
                    return episode;
                })
            })

            return Promise.all(episodesPromises).then((episodesObjects) => {
                return {
                    ...i,
                    episode: episodesObjects
                }
            })
        })

        Promise.all(characterssWithEpisodesPromises).then((characterssWithEpisodes) => console.log(characterssWithEpisodes))

    })
}
    

obtenerPersonajes("Rick Sanchez");


// Problema 1
//  Cuando la consulta solo devuelve un personaje/episodio/objeto lo devuelve y ya, sin embargo si devuelve varios personajes
//  entonces devuelve un data con info y results, por lo tanto hay q acceder con data.results
// Problema 2
//  Al hacer una consulta get dentro de un map, el return del map se resuelve antes que la promesa del get, es por eso que utilizo
//  Promise.all para agruparlas todas en una sola que se resolvera cuando todas las demas lo hayan hecho.
