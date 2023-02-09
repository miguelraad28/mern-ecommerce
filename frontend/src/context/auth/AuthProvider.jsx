import { React, createContext, useContext, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../cart/CartProvider';
import Swal from 'sweetalert2';
import Spinner from "../../components/Spinner/Spinner"
const AuthContext = createContext()
const AuthProvider = (props) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const { setCart, getCart } = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const autoLogIn = async () => {
        if (localStorage.getItem("x-access-token")) {
            const token = JSON.parse(localStorage.getItem("x-access-token"))
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/auth/autoLogIn`, {
                headers: {
                    "x-access-token": token
                }
            })
            if (res.data.pending) {
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
        setLoading(true)

        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/register`, user)
            if (!res.data.pending) {
                window.location.replace(res.data.navigate)
            } else {
                setLoading(false)
                Swal.fire(res.data.message)
            }
        } catch (error) {
            alert(error)
        }

    }
    const logIn = async (e, user) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, user)
            if (!res.data.pending) {
                setUserLoggedIn({ ...res.data.user })
                localStorage.setItem("x-access-token", JSON.stringify(res.data.token))
                getCart()
                setLoading(false)
            } else {
                setLoading(false)
                Swal.fire(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const logOut = async () => {
        setLoading(true)
        setUserLoggedIn(false)
        localStorage.removeItem("x-access-token")
        setCart([])
        localStorage.removeItem("cart")
        setLoading(false)
    }
    return (
        <AuthContext.Provider value={{ userLoggedIn, setUserLoggedIn, signUp, logIn, logOut, autoLogIn, setLoading, loading }}>
            {loading ? <div className='spinnerBackground'><Spinner /></div> : null}
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
