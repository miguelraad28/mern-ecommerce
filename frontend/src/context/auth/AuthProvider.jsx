import { React, createContext, useContext, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../cart/CartProvider';
import Swal from 'sweetalert2';
import Spinner from "../../components/Spinner/Spinner"
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext()
const AuthProvider = (props) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const { emptyCart, getCart } = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate
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
                emptyCart()
            } else {
                setUserLoggedIn({ ...res.data.user })
                getCart()
            }
        }
    }
    const signUp = async (e, user) => {
        e.preventDefault()
        setLoading(true)
        if (user.email !== user.emailConfirmation) {
            return Swal.fire("La dirección de email no coincide")
        } else if (user.password !== user.passwordConfirmation) {
            return Swal.fire("Las contraseñas no coinciden")
        }else if(user.name === undefined || user.name.length < 1){
            return Swal.fire("Indícanos tu nombre para seguir con el registro")
        }else if(user.surname === undefined || user.surname.length < 1){
            return Swal.fire("Indícanos tu apellido para seguir con el registro")
        }else if(user.password.length < 8 || user.password.length > 16){
            return Swal.fire("La contraseña debe ser entre 8 y 16 caracteres")
        } else {
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
        emptyCart()
        setLoading(false)
    }
    const recoverPassword = async(e, email) => {
        setLoading(true)
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/recoverPassword`, email)
        console.log(res)
        if (!res.data.pending) {
            navigate(res.data.navigate)
        } else {
            setLoading(false)
            Swal.fire(res.data.message)
            return res.data.pending
        }
    }
    return (
        <AuthContext.Provider value={{ userLoggedIn, setUserLoggedIn, signUp, logIn, logOut, autoLogIn, recoverPassword, setLoading, loading }}>
            {loading ? <div className='spinnerBackground'><Spinner /></div> : null}
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
