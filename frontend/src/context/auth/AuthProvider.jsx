import { React, createContext, useState, useEffect } from 'react';
import axios from 'axios';
const AuthContext = createContext()
const AuthProvider = (props) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const autoLogIn = async() => {
        if(localStorage.getItem("x-access-token")){
            const token = JSON.parse(localStorage.getItem("x-access-token"))
            const res = await axios.get(`http://localhost:3001/api/auth/autoLogIn`,{
                headers: {
                    "x-access-token": token
                }
            })
            if(res.data.sessionExpired){
                localStorage.removeItem("x-access-token")
                alert("Sesión expirada")
            }else{
                setUserLoggedIn({...res.data.user})
            }
        }
    }
    useEffect(() => {
        autoLogIn()
    }, []);
    const signUp = async (e, user) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:3001/api/auth/register", user)
            setUserLoggedIn({...res.data.user})
            localStorage.setItem("x-access-token", JSON.stringify(res.data.token))
        } catch (error) {
            alert(error)
        }
    }
    const logIn = async (e, user) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:3001/api/auth/login", user)
            console.log(res)
            setUserLoggedIn({...res.data.user})
            localStorage.setItem("x-access-token", JSON.stringify(res.data.token))
        } catch (error) {
            alert(error)
        }
    }
    const logOut = async () => {
        setUserLoggedIn(false)
        localStorage.removeItem("x-access-token")
    }

    return (
        <AuthContext.Provider value={{ userLoggedIn, setUserLoggedIn, signUp, logIn, logOut }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
