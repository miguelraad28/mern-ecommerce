import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./VerifyEmail.scss";
const VerifyEmail = ({ queryParams }) => {
    const { setUserLoggedIn } = useContext(AuthContext)
    const [validationMessage, setValidationMessage] = useState(false);
    const [confirmation, setConfirmation] = useState({
        code: "",
        validationToken: ""
    });
    const navigate = useNavigate()
    const handleOnChange = (e) => {
        if (Number(e.target.value) <= 999999) {
            setConfirmation({
                ...confirmation,
                [e.target.name]: parseInt(e.target.value)
            })
        }
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        if (String(confirmation.code.length) < 6) return Swal.fire("Por favor ingrese el código completo")
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/verifyEmail`, confirmation)
        if (!res.data.pending && res.data.user.account === "approved") {
            setUserLoggedIn({ ...res.data.user })
            localStorage.setItem("x-access-token", JSON.stringify(res.data.token))
            navigate("/myaccount", {state: {message: res.data.message}})
        } else {
            Swal.fire(res.data.message)
        }
    }
    const resendValidationCode = async (message) => {
        if (message) {
            const { value: email } = await Swal.fire({
                title: `${message}`,
                inputLabel: "Dirección de email",
                input: 'email',
                inputPlaceholder: 'Email'
            })
            if (email) {
                console.log(email)
                const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/resendValidationCode`, { email: email })
                if (res.data.pending) {
                    return resendValidationCode()
                } else {
                    setValidationMessage(res.data.message)
                    navigate(res.data.navigate)
                }
            }
        } else {
            const { value: email } = await Swal.fire({
                inputLabel: "Dirección de email",
                input: 'email',
                inputPlaceholder: 'Email'
            })
            if (email) {
                console.log(email)
                const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/resendValidationCode`, { email: email })
                if (res.data.pending) {
                    return resendValidationCode(res.data.message)
                } else {
                    setValidationMessage(res.data.message)
                    navigate(res.data.navigate)
                }
            }
        }


    }
    useEffect(() => {
        if (queryParams) {
            setConfirmation({
                ...confirmation,
                validationToken: queryParams.validationToken
            })
        }
    }, [queryParams]);
    return (
        <div className='verifyEmailContainer'>
            <h2>{validationMessage ? "Recuerda revisar tu apartado de spam" : "¡Cuenta creada exitosamente!"}</h2>

            <h3>{validationMessage ? validationMessage : "En tu email encontrarás el código de validación a ingresar"}</h3>
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <input
                    onChange={(e) => handleOnChange(e)}
                    type="number"
                    name="code"
                    value={confirmation.code}
                />
                <button>VALIDAR CUENTA</button>
            </form>
            <p className='swalResendCode' onClick={() => resendValidationCode()}>Reenviar código de validación</p>
            <p className='pNote'>El código anterior perdera vigencia</p>
        </div >
    );
}

export default VerifyEmail;
