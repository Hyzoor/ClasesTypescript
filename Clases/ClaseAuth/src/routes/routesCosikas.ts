import dotenv from "dotenv";
import { Router } from "express";
import { AuthRequest, verifyToken } from "../middlewares/verifyToken";


dotenv.config();
const router = Router();

// --------- Rutas Publicas -------------









// --------- Rutas Privadas -------------

router.use(verifyToken);

router.get('/', async (req: AuthRequest, res) => {

    const email = req.user?.email;
    const id = req.user?.id;


    res.json("mis cosikas devueltas");

})

export default router;
