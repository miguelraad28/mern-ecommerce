import { React, useState, useContext } from 'react';
import { AuthContext } from './context/auth/AuthProvider';
import axios from 'axios';
const Login = () => {
    const { userLoggedIn, setUserLoggedIn } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const handleOnChange = (e) => {
        e.preventDefault()
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        console.log(user)
    }
    const logIn = async (e, data) => {
        e.preventDefault()
        try {
            const res = await axios.post("https://mern-ecommerce-back-ashen.vercel.app/api/auth/login", user)
            setUserLoggedIn(res.data)
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    const { 
        email,
        password,
        } = user
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={logIn} style={{ display: "flex", flexDirection: "column", }}>
                <label>Email</label>
                <input
                    onChange={handleOnChange}
                    value={email}
                    name="email"
                    type="email" />
                <label>Password</label>
                <input
                    onChange={handleOnChange}
                    value={password}
                    name="password"
                    type="password" />
                <button>Log in</button>
            </form>
        </div>
    );
}

export default Login;
