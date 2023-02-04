import { React, createContext, useContext, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../cart/CartProvider';
import Swal from 'sweetalert2';

const AuthContext = createContext()
const AuthProvider = (props) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const { setCart, getCart } = useContext(CartContext);
    const [accountCreated, setAccountCreated] = useState(false);
    const autoLogIn = async () => {
        if (localStorage.getItem("x-access-token")) {
            const token = JSON.parse(localStorage.getItem("x-access-token"))
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/auth/autoLogIn`, {
                headers: {
                    "x-access-token": token
                }
            })
            if (res.data.sessionExpired) {
                localStorage.removeItem("x-access-token")
                Swal.fire(res.data.message)
                setCart([])
                localStorage.removeItem("cart")
            } else {
                setUserLoggedIn({ ...res.data.user })
                getCart()
            }
        }
    }
    const signUp = async (e, user) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/register`, user)
            if(res.data.pending){
                return setAccountCreated(true)
            }else{
                Swal.fire(res.data.message)
            }
        } catch (error) {
            alert(error)
        }
    }
    const logIn = async (e, user) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, user)
            if (res.data.pending) {
                Swal.fire(res.data.message)
            } else {
                setUserLoggedIn({ ...res.data.user })
                localStorage.setItem("x-access-token", JSON.stringify(res.data.token))
                getCart()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const logOut = async () => {
        setUserLoggedIn(false)
        localStorage.removeItem("x-access-token")
        setCart([])
        localStorage.removeItem("cart")
    }
    return (
        <AuthContext.Provider value={{ userLoggedIn, setUserLoggedIn, signUp, logIn, logOut, autoLogIn, accountCreated }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
