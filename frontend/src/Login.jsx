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
    }
    
    const { 
        email,
        password,
        } = user
    return (
        <div className='logInForm'>
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
            
        </div>
    );
}

export default Login;
