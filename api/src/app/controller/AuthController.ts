import {Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../database";
import config from "../../config/app";
import {validateEmail} from "../../helper/email";

const loginAuth = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    if (!email || !validateEmail(email) || !password || !(email && password)) {
        return res.status(400).json({
            "message": "Invalid Input"
        });
    }
    const userResult = await db.query("SELECT * FROM \"user\" WHERE email=$1 LIMIT 1", [email]);
    if (userResult.rows.length > 0 && (await bcrypt.compare(password, userResult.rows[0].password))) {
        const user = userResult.rows[0];
        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            last_login: user.last_login,
            access_token: jwt.sign(
                {user_id: user.id, email},
                config.jwt.secret,
                {
                    expiresIn: "6h",
                }
            )
        });
    }
    return res.status(400).json({
        "message": "Username or Password is Incorrect"
    });
}

export {loginAuth}
