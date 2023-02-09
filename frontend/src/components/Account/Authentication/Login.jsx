import { React, useState, useContext } from 'react';
import { AuthContext } from '../../../context/auth/AuthProvider';
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

        <div className='logInForm' >
            <h2>INICIAR SESIÓN</h2>
            <form onSubmit={(e) => logIn(e, user)} style={{ display: "flex", flexDirection: "column", }}>
                <label>Email</label>
                <input
                    onChange={handleOnChange}
                    value={email}
                    name="email"
                    required
                    type="email" />
                <label>Contraseña</label>
                <input
                    onChange={handleOnChange}
                    value={password}
                    name="password"
                    required
                    type="password" />
                <button type='submit' className='pinkButton'>INICIAR</button>
            </form>

        </div>

    );
}

export default Login;
