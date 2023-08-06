import {useEffect, useState} from "react";
import axiosClient from "../../api/axios";
import stockHistory from "../../helpers/stockHistory";
import Dashboard from "../../components/dashboard/Dashboard";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss"

function Home() {
    const [tickerData, setTickerData] = useState({});
    const [stockData, setStockData] = useState([]);
    const token = localStorage.getItem("accessToken");
    const authHeader = {headers: {"Authorization": `Bearer ${token}`}};
    const {name} = JSON.parse(localStorage.getItem("userInfo"));
    const ticker = (name) => {
        if (name === "all") {
            setStockData([]);
            for (const k in tickerData) {
                axiosClient.get(`/stock/${tickerData[k]['name']}`, authHeader).then(response => {
                    setStockData(stockData => [...stockData, stockHistory(response.data)])
                })
            }
        } else {
            axiosClient.get(`/stock/${name}`, authHeader).then(response => {
                setStockData([stockHistory(response.data)]);
            })
        }
    }

    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    }

    useEffect(() => {
        axiosClient.get('/ticker', authHeader).then(response => {
            setTickerData(response.data.data);
            for (let k in response.data.data) {
                axiosClient.get(`/stock/${response.data.data[k]['name']}`, authHeader).then(response => {
                    setStockData(stockData => [...stockData, stockHistory(response.data)])
                })
            }
        })
    }, []);


    return (
        <div className="home">
            <Sidebar data={tickerData} tickerFunction={ticker}/>
            <div className="container">
                <Navbar logoutFunc={logout} userName={name}/>
                <Dashboard stockDataFunc={stockData}/>
            </div>
        </div>
    )

}

export default Home;
