import { React, useState, useContext } from 'react';
import { AuthContext } from './context/auth/AuthProvider';
import axios from "axios"
const Register = () => {
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
    const signUp = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("https://mern-ecommerce-back-ashen.vercel.app/api/auth/register", user)
            setUserLoggedIn(res.data)
        } catch (error) {
            alert(error)
        }
    }
    const { name,
        lastname,
        dni,
        email,
        password,
        roles } = user
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={signUp} style={{ display: "flex", flexDirection: "column", }}>
                <label>Name</label>
                <input
                    onChange={handleOnChange}
                    value={name}
                    name="name"
                    type="text" />
                <label>Lastname</label>
                <input
                    onChange={handleOnChange}
                    value={lastname}
                    name="lastname"
                    type="text" />
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
                <label>DNI</label>
                <input
                    onChange={handleOnChange}
                    value={dni}
                    name="dni"
                    type="number" />
                <label>Rol</label>
                <input
                    onChange={handleOnChange}
                    value={roles}
                    name="roles"
                    type="text" />
                <button type='submit'>Register</button>
            </form>
        </div>
    );
}

export default Register;
