import { Router } from "express";
import { getDb } from "./mongo";
import { ObjectId } from "mongodb";



const router = Router();

const coleccion = () => getDb().collection("ArquitecturaProgramacionInternet");

router.get('/', async (req, res) => {

    try {

        const personas = await coleccion().find().toArray();
        res.json(personas);

    } catch (error) {
        res.status(404).json(error);
    }
});

router.post("/", async (req, res) => {

    try {

        // Comprobacion del body
        const newName = req.body?.name;
        const newLastName = req.body?.lastName;

        if (newName && newLastName && typeof newName === "string" && typeof newLastName === "string") {
            const result = await coleccion().insertOne(req.body);
            const idMongo = result.insertedId;
            const personaCreada = await coleccion().findOne({ _id: idMongo })    // No entiendo muy bien esto
            res.status(201).json(personaCreada);
        } else {
            res.status(400).json({ message: "Invalid input body" })
        }


    } catch (err) {
        res.status(400).json(err);  // Ver codigos de error
    }
})


router.get("/:id", async (req, res) => {

    //falta try catch
    const idPersona = req.params.id;
    if (idPersona.length == 24) {
        const persona = await coleccion().findOne({ _id: new ObjectId(idPersona) });  // Tengo que crear un object id de mongo con el id a buscar
        persona
            ? res.json(persona)
            : res.status(404).json({ message: "Persona no encontrada" });

    } else {
        res
            .status(404)
            .json({ message: "Id de diferente longitud a 24 caracteres" });
    }

})

router.put("/:id", async (req, res) => {
    try {

        const result = await coleccion().updateOne(
            { _id: new ObjectId(req.params?.id) },
            { $set: req.body }
        )

        res.json(result);
    } catch (err) {
        res.status(404).json(err);
    }

})


router.delete("/:id", async (req, res) => {
    try {

        const result = await coleccion().deleteOne(
            { _id: new ObjectId(req.params.id) }
        )

        res.json(result);

    } catch (err) {
        res.status(404).json(err)
    }
})


export default router;