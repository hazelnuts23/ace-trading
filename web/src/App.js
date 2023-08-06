import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import "./App.scss";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {GuardedRoute, CheckAuth} from "./services/GuardedRoute";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<GuardedRoute/>}>
                        <Route index element={<Home/>}/>
                    </Route>
                    <Route path="/login" element={<CheckAuth/>}>
                        <Route index element={<Login/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
