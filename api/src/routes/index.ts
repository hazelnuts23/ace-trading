import express from "express";
import {AuthRoute} from "./auth";
import {DashboardRoute} from "./dashboard";

export const routes = express.Router();

routes.use(AuthRoute);
routes.use(DashboardRoute);
