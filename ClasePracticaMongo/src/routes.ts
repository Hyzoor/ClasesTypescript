import { Router } from "express";
import type { LD } from "./types";
import { getDb } from "./mongo";
import { ObjectId } from "mongodb";


const router = Router();

const coleccion = () => getDb().collection("Discos");

const validateLDData = (data: any): string | null => {

    if (!data) return "No se ha proporcionado ningún dato en el body";

    const updates: Partial<LD> = data;

    if ("filmName" in updates && typeof updates.filmName !== "string") return "El nombre tiene que ser una cadena de caracteres";
    if ("region" in updates && typeof updates.region !== "string") return "La región tiene que ser una cadena de caracteres";
    if ("lengthMinutes" in updates && typeof updates.lengthMinutes !== "number") return "La longitud tiene que ser un número entero";
    if ("rotationType" in updates && updates.rotationType !== "CAV" && updates.rotationType !== "CLV") return "El tipo de rotación ha de ser CAV o CLV";
    if ("videoFormat" in updates && updates.videoFormat !== "NTSC" && updates.videoFormat !== "PAL") return "El formato tiene que ser NTSC o PAL";

    return null;
};


router.get("/", async (req, res) => {


    const page = Number(req.query?.page) || 1;
    const limit = Number(req.query?.limit) || 2;
    const skip = (page - 1) * limit;

    try {
        const discos = await coleccion().find().skip(skip).limit(limit).toArray();

        const discosValidos = discos.filter((x) => !validateLDData(x));

        res.json(
            {
                info: {
                    page: page,
                    resultsOnPage: limit
                },

                results: discosValidos
            });

    } catch (error: any) {
        res
            .status(404)
            .json({ message: "No se ha podido obtener los discos", detail: error.message })
    }
})

router.get("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const disco = await coleccion().findOne({ _id: new ObjectId(id) })
        const error = validateLDData(disco);

        return error
            ? res.status(404).json({ messgage: "Disco no encontrado", detail: error })
            : res.json(disco)


    } catch (error: any) {
        res
            .status(404)
            .json({ message: "No se ha podido obtener el disco", detail: error.message })
    }
})

router.post("/", async (req, res) => {

    try {

        const error = validateLDData(req.body);
        if (error) return res.status(400).json({ error });

        const result = await coleccion().insertOne(req.body);
        const discoInsertado = await coleccion().findOne({ _id: result.insertedId });
        res
            .status(201)
            .json(discoInsertado);

    } catch (err: any) {
        res
            .status(500)
            .json({ message: "Error al crear el LD", detail: err.message });
    }

})

router.delete("/:id", async (req, res) => {

    try {
        const id = req.params.id;

        const discoEliminar = await coleccion().findOne({ _id: new ObjectId(id) });

        if (!discoEliminar) {
            return res.status(404).json({ message: "Disco a eliminar no encontrado" })
        }

        const result = await coleccion().deleteOne({ _id: new ObjectId(id) });

        res.json(result);

    } catch (err: any) {
        res
            .status(500)
            .json({ message: "Error al eliminar el LD", detail: err.message })
    }

})

router.put("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const error = validateLDData(req.body);
        if (error) return res.status(404).json({ error });

        const result = await coleccion().updateOne(
            { _id: new ObjectId(id) },
            { $set: req.body }
        )

        res.json(result);

    } catch (err: any) {
        res
            .status(500)
            .json({ message: "Error al actualizar el ld", detail: err.message });
    }
})

export default router;