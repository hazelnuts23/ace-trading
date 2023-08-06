import db from "../../database";
import config from "../../config/app"
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import csv from "csvtojson";

const stockDir: string = __dirname + "/../files/stocks";

let tickerArr: Array<any> = [];
fs.readdirSync(stockDir).forEach((file: string) => {
    if(file !== '.DS_Store'){
        tickerArr.push({
            ticker_name: path.parse(String(file)).name,
            path: `${stockDir}/${file}`
        })
    }
})

const userSeed = () => {
    db.query("SELECT * FROM \"user\" WHERE email=$1", ["admin@test.com"]).then((result: { rows: string | any[]; }) => {
        if (result.rows.length === 0) {
            return db.query("INSERT INTO \"user\" (email, name, password, status) VALUES ($1, $2, $3, $4)", ['admin@test.com', 'Admin', bcrypt.hashSync("AlQcExwqyvMExVJ", config.salt_round), 1])
        }
    });

}

const stockSeed = () => {
    const createTicker: Array<any> = [];
    const createStockData: Array<any> = [];
    for (const key in tickerArr) {
        const tickerName = tickerArr[key]['ticker_name'];
        createTicker.push(db.query("INSERT INTO ticker (name) VALUES ($1)", [tickerName]));
        csv().fromFile(tickerArr[key]['path']).then((obj) => {
            for (const key in obj) {
                createStockData.push(db.query("INSERT INTO stock (open, high, low, close, volume, dividends, stock_splits, ticker_name, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [obj[key]['Open'], obj[key]['High'], obj[key]['Low'], obj[key]['Close'], obj[key]['Volume'], obj[key]['Dividends'], obj[key]['Stock Splits'], tickerName, obj[key]['Date']]));
            }
            return obj;
        })
    }
    Promise.all(createTicker);
    const chunkSize: number = 10
    const chunkCreateStockData: Array<any> = [];
    for (let i = 0; i < createStockData.length; i += chunkSize) {
        const chunk = createStockData.slice(i, i + chunkSize);
        chunkCreateStockData.push(chunk);
    }
    chunkCreateStockData.forEach((chunk) => {
        Promise.all(chunk);
    });
}

userSeed();
stockSeed();
