import express from "express"
import cors from "cors"


type Persona = {

    id: string,
    name: string,
    email: string

}


let personitas: Persona[] = [
    { id: "1", name: "Pepito", email: "pepitocorreo@gmail.uk" },
    { id: "2", name: "Juanillo", email: "juanillofetido@mail.co" }
]


//Creo API y configuro puerto
const app = express();
const port = 3000;  //Tipico para localhost

app.use(cors());
app.use(express.json());

//Definimos la ruta
app.get("/", (req, res) => {
    res.send("Okey hoalfha");
});


//Ejemplos de endpoints para cada peticion

app.get("/personas", (req, res) => {
    res.json(personitas);   //Es lo mismo que hacer un send, pero asi indico que estoy mandando un json para evitar errores
})

app.post("/personas", (req, res) => {
    const nuevaPersona: Persona = {
        id: Date.now().toString(),
        ...req.body
    }

    personitas.push(nuevaPersona);
    res.status(201);    //Codigo 201 = Objeto creado satisfactoriamente
    res.json(nuevaPersona);     //Por limpieza se suele mandar el objeto creado como respuestas
})

app.put("/personas/:id", (req, res) => {    // :id es una variable que podemos leer, todo lo que llega es un string

    const id = req.params.id;

    const personasNuevas = personitas.map((x) => {
        if (x.id === id) return { ...x, ...req.body };
        else return x;
    })

    personitas = personasNuevas;
    res.json({ message: "Persona actualizada correctamente" });

})

app.delete("/personas/:id", (req, res) => {
    const id = req.params.id;
    const personasNuevas = personitas.filter((x) => (x.id !== id));
    personitas = personasNuevas;
    res.json({ message: "Persona eliminada correctamente" });
})


//Dejamos a la escucha
app.listen(port, () => {
    console.log("Server started at: " + port);
});