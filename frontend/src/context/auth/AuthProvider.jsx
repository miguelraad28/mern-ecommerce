import { React, createContext, useState } from 'react';
import axios from "axios"
const AuthContext = createContext()
const AuthProvider = (props) => {
    const [user, setUser] = useState(false);
    const logIn = async (e, user) => {
        e.preventDefault()
        try {
            const res = await axios.post("https://mern-ecommerce-back-ashen.vercel.app/api/auth/login", user)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    const logOut = async () => {
    }
    const signUp = async (e, user) => {
        e.preventDefault()
        try {
            const res = await axios.post("https://mern-ecommerce-back-ashen.vercel.app/api/auth/register", user)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AuthContext.Provider value={{ user, logIn, logOut, signUp }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
