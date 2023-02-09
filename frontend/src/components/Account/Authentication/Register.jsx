import { React, useState, useContext } from 'react';
import { AuthContext } from '../../../context/auth/AuthProvider';
const Register = () => {
    const { signUp } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const handleOnChange = (e) => {
        e.preventDefault()
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const { name,
        surname,
        email,
        password,
    } = user
    return (

        <div className='signUpForm'>
            <h2>CREAR CUENTA</h2>
            <form onSubmit={(e) => signUp(e, user)} style={{ display: "flex", flexDirection: "column", }}>
                <label>Nombre</label>
                <input
                    onChange={handleOnChange}
                    value={name}
                    name="name"
                    required
                    type="text" />
                <label>Apellido</label>
                <input
                    onChange={handleOnChange}
                    value={surname}
                    name="surname"
                    required
                    type="text" />
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
                <button type='submit' className='purpleButton'>REGISTRARME</button>
            </form>
        </div>

    );
}

export default Register;
