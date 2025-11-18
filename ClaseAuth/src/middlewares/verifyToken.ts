import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express"

dotenv.config();
const SECRET = process.env.SECRET;


// export interface AuthRequest extends Request {
//     user?: string | jwt.JwtPayload;
// }

export interface AuthRequest extends Request {
    user?: jwt.JwtPayload & {
        id: string,
        email: string
    };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {

    const headerToken = req.headers["authorization"];
    const token = headerToken ? headerToken.split(" ")[1] : false;
    // Beaver 34lk3nlqk9f087234; spliteo en array en cuanto hay un espacio y obtengo solo el token

    if (!token) return res.status(401).json({ message: "No hay token" });

    jwt.verify(token, SECRET as string, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid access token" });
        req.user = decoded as jwt.JwtPayload & { email: string, id: string };
        next();
    })
}

// Agregar la funcion middleware a las llamadas que queramos usarla antes.


