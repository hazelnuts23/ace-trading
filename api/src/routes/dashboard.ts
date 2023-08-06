import {verifyToken} from "../app/middleware/auth";
import {stockData, ticker} from "../app/controller/DashboardController";
import {Router} from "express";

export const DashboardRoute = Router();

DashboardRoute.get('/ticker', verifyToken, ticker);
DashboardRoute.get('/stock/:ticker?', verifyToken, stockData);
