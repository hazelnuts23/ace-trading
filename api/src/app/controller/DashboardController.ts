import {Request, Response} from "express";
import db from "../../database";

const ticker = async (req: Request, res: Response) => {
    const tickerResult:any = await db.query("SELECT * FROM ticker ORDER BY name ASC");
    const data:any = (tickerResult.rows.length > 0) ? tickerResult.rows : []
    res.json({data})
}
const stockData = async (req: Request, res: Response) => {
    let {ticker} = req.params;
    if(!ticker){
        const tickerResult = await db.query("SELECT * FROM ticker ORDER BY name ASC LIMIT 1");
        ticker = tickerResult.rows[0].name;
    }
    const stockResult = await db.query("SELECT TO_CHAR(date, \'yyyy-mm-dd\') as date, open, high, low, close, volume FROM stock WHERE ticker_name=$1 AND DATE_PART('year', date) >= 2010  ORDER BY date ASC", [ticker]);
    const data = (stockResult.rows.length > 0) ? stockResult.rows : []
    res.json({ticker, data})
}

export {ticker, stockData}
