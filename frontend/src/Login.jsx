import {React, useState, useContext} from 'react';
import { AuthContext } from './context/auth/AuthProvider';
const Login = () => {
    const { logIn } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const handleOnChange = (e) => {
        e.preventDefault()
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
        console.log(user)
    }
    const { name,
        lastname,
        dni,
        email,
        password,
        roles } = user
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
