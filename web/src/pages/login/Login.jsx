import {useEffect, useState} from "react";
import "./login.scss";
import axiosClient from "../../api/axios";

/**
 * Login form
 * @returns {JSX.Element}
 * @constructor
 */
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await axiosClient.post("/login", {
                email,
                password,
            }).then((res) => {
                if (res.data.access_token) {
                    localStorage.setItem("accessToken", res.data.access_token);
                    localStorage.setItem("userInfo", JSON.stringify({
                        name: res.data.name,
                        email: res.data.email,
                        last_login: res.data.last_login
                    }));
                    window.location.href = "/";
                }
            })
        } catch (error) {
            if (!error?.response) {
                setError("no server response");
            } else {
                setError(error.response.data.message);
            }
        }
    };

    const ErrorMessage = () => {
        if (error.length > 0) {
            return (<div className="error-box">
                {error}
            </div>)
        }
    }
    return (
        <div className="login-page">
            <div className="form">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <ErrorMessage/>
                    <h3>Welcome to Ace Admin, Please Sign In</h3>
                    <label>
                        <p>Email</p>
                        <input placeholder="email" type="text" name="email" onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                    <label>
                        <p>Password</p>
                        <input placeholder="password" type="password" name="password"
                               onChange={(e) => setPassword(e.target.value)}/>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
