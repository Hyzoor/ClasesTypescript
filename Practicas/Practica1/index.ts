
type Lugar = {
    id: number,
    nombre: string,
    tipo: string,
    peligro: number
}

type Personaje = {
    id: number,
    nombre: string,
    fuerza: number,
    aliado: boolean
}

type Objeto = {
    id: number,
    nombre: string,
    poder: number,
    categoria: string
}

type CategoriasPoder = {
    arma: number
    herramienta: number,
    magico: number,
}

const lugares: Lugar[] = [
  { id: 1, nombre: "Bosque Misterioso", tipo: "bosque", peligro: 2 },
  { id: 2, nombre: "Cueva Oscura", tipo: "cueva", peligro: 5 },
  { id: 3, nombre: "Castillo Abandonado", tipo: "castillo", peligro: 4 }
];
 
const personajes: Personaje[] = [
  { id: 1, nombre: "Sabio 23", fuerza: 8, aliado: false },
  { id: 2, nombre: "Sabio 24", fuerza: 2, aliado: true },
  { id: 3, nombre: "Bandido", fuerza: 6, aliado: false }
];
 
const objetos: Objeto[] = [
  { id: 1, nombre: "Espada", poder: 5, categoria: "arma" },
  { id: 2, nombre: "Antorcha", poder: 1, categoria: "herramienta" },
  { id: 3, nombre: "Amuleto", poder: 3, categoria: "mágico" },
  { id: 4, nombre: "Escudo", poder: 4, categoria: "arma" }
];

const listarLugares = (): void => {
    lugares.forEach((lugar) => {
        console.log("Lugar: ",lugar.nombre," Nivel de peligro: ",lugar.peligro)
    });
}

const buscarPersonaje = (nombre: string): void => {
    const personajesFiltrados = personajes.filter((personaje) => {
        return personaje.nombre.toLowerCase().includes(nombre.toLowerCase());
    })

    personajesFiltrados.forEach((personaje) => {
        console.log(personaje.nombre + " Fuerza: " + personaje.fuerza + " Aliado: " + personaje.aliado)
    })

}

const inventarioConFrases = (): string[] => {

    const inventario = objetos.map((objeto) => {
        return objeto.nombre + " (+" + objeto.poder + ", categoria: " + objeto.categoria + ")";
    })

    return inventario; 
}

const agruparObjetosPorCategoria = (): CategoriasPoder => {

    const initialValue: CategoriasPoder = {arma: 0, herramienta: 0, magico: 0};

    const result: CategoriasPoder = objetos.reduce((accum, objeto) => {
        
        if(objeto.categoria === "mágico") accum.magico += objeto.poder
        else if(objeto.categoria === "herramienta") accum.herramienta += objeto.poder
        else if(objeto.categoria === "arma") accum.arma += objeto.poder
        
        return accum;

    }, initialValue);

    return result;
    
}

const poderTotalInventario = (): number => {

    const poderTotal = objetos.reduce((accumulator, objeto) => {
        return accumulator + objeto.poder;
    }, 0)

    return poderTotal;
}




const main = (): void => {
  const opcion: number = 2; // Cambia este número para probar
 
  switch (opcion) {
    case 1:
      listarLugares();
      break;
    case 2:
      const nombreBuscado = "sabio"; // Cambia el nombre para probar
      buscarPersonaje(nombreBuscado);
      break;
    case 3:
      console.log(inventarioConFrases());
      break;
    case 4:
      console.log(agruparObjetosPorCategoria());
      break;
    case 5:
      console.log("Poder total:", poderTotalInventario());
      break;
    default:
      console.log("Opción no válida.");
  }
};


main();