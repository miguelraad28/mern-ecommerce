import { React, useState, useContext } from 'react';
import { AuthContext } from './context/auth/AuthProvider';
import { Link } from 'react-router-dom';
const Login = () => {
    const { logIn } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const handleOnChange = (e) => {
        e.preventDefault()
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        console.log(user)
    }
    
    const { 
        email,
        password,
        } = user
    return (
        <div>
            <h1>PRUEBA</h1>
            <h1>Login</h1>
            <form onSubmit={(e) => logIn(e, user)} style={{ display: "flex", flexDirection: "column", }}>
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
            <Link to="/register"><button>Registrarme</button></Link>
        </div>
    );
}

export default Login;
