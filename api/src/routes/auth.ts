import {Request, Response, Router} from "express";
import {loginAuth} from "../app/controller/AuthController";

export const AuthRoute = Router();

AuthRoute.post('/login', loginAuth);
