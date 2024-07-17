import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import styles from "../styles/login.module.css";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleApi = () => {
        const url = API_URL + '/login';
        const data = { username, password };
        
        axios.post(url, data)
            .then((res) => {
                if (res.data.message && res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userId', res.data.userId);
                    navigate('/');
                }
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.message) {
                    alert(`Authentication failed: ${err.response.data.message}`);
                } else {
                    alert('SERVER ERR');
                }
            });
    }

    return (
        <div className={styles.login}>
            <div className={styles.wrapper}>
                <h1> Welcome to Login Page </h1>
                <br></br>
                USERNAME
                <div className={styles.inputbox}>
                <input className="form-control" type="text" value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                </div>
                <br></br>
                PASSWORD
                <input className="form-control" type="text" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <br></br>
                <button className={styles.btn} onClick={handleApi}> LOGIN </button>
                <Link to="/signup" className={styles.btn}> SIGN UP </Link>
            </div>
        </div>
    )
}

export default Login;
