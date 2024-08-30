import React from 'react';
import './login.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [value, setValue] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [error , setError] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/auth/adminLogin", value).then((res) => {
            if(res.data.message === "Login success!"){
                navigate("/Dashboard");
            }
            else {
                setError(res.data.message);
            }
        }).then((err) => {
            console.log(err);
        })
    }
    return (
        
        <div className="login-page">
            <div className="login-container">
                <div className='error text-yellow-500'>
                    {error && <p>{error}</p>}
                </div>
                <h2 className="text-2xl font-bold mb-6 text-gray-400">Login Page</h2>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setValue({ ...value, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setValue({ ...value, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
