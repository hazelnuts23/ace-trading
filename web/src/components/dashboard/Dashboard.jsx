import "./dashboard.scss";
import {IgrFinancialChart} from 'igniteui-react-charts';
import {IgrFinancialChartModule} from 'igniteui-react-charts';
import {useEffect, useState} from "react";

IgrFinancialChartModule.register();

/**
 * Display dashboard main container. Render charts of trading
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Dashboard = (props) => {
    const [stockData, setStockData] = useState(props);
    useEffect(() => {
        setStockData(props.stockDataFunc);
    }, [props.stockDataFunc])
    const TickerChart = () => {
        if (stockData.length === 0) return "Loading...";
        let listChart = [];
        for (const k in stockData) {
            listChart.push(
                <div key={k} className="ticker-chart">
                    <h3>{stockData[k].ticker + " Stocks"}</h3>
                    <div className="container" style={{height: "calc(100% - 25px)"}}>
                        <IgrFinancialChart
                            width="100%"
                            height="100%"
                            chartType="Line"
                            thickness={2}
                            chartTitle={stockData[k].ticker + " Stocks"}
                            yAxisMode="PercentChange"
                            yAxisTitle="Percent Changed"
                            dataSource={stockData[k].data}/>
                    </div>
                </div>)
        }
        return listChart;
    }
    return (
        <div className="dashboard-wrapper">
            <TickerChart/>
        </div>
    )
}

export default Dashboard;
