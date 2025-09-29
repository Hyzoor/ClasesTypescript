

fetch("https://rickandmortyapi.com/api/character/1").then((response) => {
    
    const data = response.json();
    data.then((data) => {
        console.log(data);
    })
    
}).catch((error) => {
    console.log("Error", error);
}).finally(() => {
    console.log("Fin de la peticion");
});