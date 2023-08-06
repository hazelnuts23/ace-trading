/**
 * Convert data to consumable data for chart
 * @param stockData
 * @returns {{ticker: any, data: []}}
 */
const stockHistory = (stockData) => {
    const stockItems = [];
    for (let json of stockData.data) {
        let parts = json.date.split("-");
        let item = new StockItem();
        item.date = new Date(parts[0], parts[1], parts[2]);
        item.open = Math.round(json.open * 10) / 10;
        item.high = Math.round(json.high * 10) / 10;
        item.low = Math.round(json.low * 10) / 10;
        item.close = Math.round(json.close * 10) / 10;
        item.volume = json.volume;
        stockItems.push(item);
    }
    return {
        ticker: stockData.ticker,
        data: stockItems
    };
}

export class StockItem {
     open: number;
     close: number;
     high: number;
     low: number;
     volume: number;
     date: Date;
}

export default stockHistory;

